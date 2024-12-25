const userModel = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// [POST]: /login
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    // Mã 400: Bad request
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    try {
        // console.log('Email:', email);
        // console.log('Password:', pwd);
        const foundUser = await userModel.getUserByEmail(email);
        // console.log('Found User:', foundUser);

        if (!foundUser) {
            return res.status(401).json({ 'message': 'Email not found' });
        }

        // console.log('PasswordOrGoogleID (hashed password):', foundUser.passwordorgoogleid);
        const match = await bcrypt.compare(password, foundUser.passwordorgoogleid);
        if (match) {
            const role = Object.values(foundUser.role);
            // Tạo accessToken trả về cho frontend
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "email": foundUser.email,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' } // Hạn 1 tiếng
            );
            const refreshToken = jwt.sign(
                { "email": foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '3d' } // Hạn 1 ngày
            );

            await userModel.updateRefreshToken(foundUser.email, refreshToken);

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        } else {
            // Mã 401: Lỗi xác thực
            res.sendStatus(401); 
        }
    } catch (err) {
        console.error(err);
        // Mã 500: Lỗi server
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
};

module.exports = { handleLogin };
