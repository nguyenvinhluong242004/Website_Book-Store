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

            if (userByEmail) {
                return done(null, userByEmail);
            } else {
                const newUser = await userModel.createUserWithGoogle(profile.email, profile.name, 1, profile.id)

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

passport.deserializeUser(function (email, done) {
    userModel.getUserByEmail(email)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});