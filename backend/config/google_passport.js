const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const userModel = require('../models/user.model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://localhost:8888/google/callback",
    passReqToCallback: true,
},
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            const userByEmail = await userModel.getUserByEmail(profile.email);
            // console.log('PROFILE: ', profile);

            if (userByEmail) {
                return done(null, userByEmail);
            } else {
                const name = profile.given_name + " " + profile.family_name;
                const newUser = await userModel.createUserWithGoogle(profile.email, name, 1, profile.id)

                return done(null, newUser);
            }
        } catch (err) {
            console.error('Error during user saving process:', err);
            return done(err, null);
        }
    }));

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
    try {
        // Lấy lại thông tin user từ database bằng email
        const user = await userModel.getUserByEmail(email);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});