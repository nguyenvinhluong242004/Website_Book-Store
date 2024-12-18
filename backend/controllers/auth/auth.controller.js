require('dotenv').config();

const userModel = require('../../models/auth/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    // Mã 400: Bad request
    if (!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required.' });

    try {
        console.log('Email:', email);
        console.log('Password:', pwd);
        // Sử dụng UserModel để tìm người dùng theo email
        const foundUser = await userModel.getUserByEmail(email);
        console.log('Found User:', foundUser);

        if (!foundUser) {
            return res.status(401).json({ 'message': 'Email not found' });
        }

        console.log('PasswordOrGoogleID (hashed password):', foundUser.passwordorgoogleid);
        // So sánh mật khẩu
        const match = await bcrypt.compare(pwd, foundUser.passwordorgoogleid);
        if (match) {
            // Tạo accessToken trả về cho frontend
            const accessToken = jwt.sign(
                { "email": foundUser.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' } // Hạn 30s
            );
            // Tạo refreshToken để lấy accesstoken mỗi lần vào trang
            const refreshToken = jwt.sign(
                { "email": foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' } // Hạn 1 ngày
            );

            // Cập nhật refresh token trong cơ sở dữ liệu
            await userModel.updateUser(foundUser.id_user, { ...foundUser, refresh_token: refreshToken });

            // Đặt refresh token trong cookie
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
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
