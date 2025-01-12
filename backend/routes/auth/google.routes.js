const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const userModel = require('../../models/user.model');
const cartModel = require('../../models/user/cart.model');

router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback',
    passport.authenticate('google'),
    async (req, res) => {
        try {
            if (req.user) {
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": req.user.email,
                            "role": req.user.role
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );

                const refreshToken = jwt.sign(
                    { "email": req.user.email },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '3d' }
                );

                await userModel.updateRefreshToken(req.user.email, refreshToken);

                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    secure: true, // Chỉ sử dụng secure cookie trong môi trường production
                    sameSite: 'None', // Cho phép cookie được gửi trong các yêu cầu cross-origin
                    maxAge: 24 * 60 * 60 * 1000 // Thời gian sống của cookie (1 ngày)
                });
                // return res.status(200).json({ accessToken });
                return res.redirect(`https://localhost:8080?accessToken=${accessToken}`);
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Đăng nhập thất bại'
                });
            }
        } catch (err) {
            console.error(err); // Log lỗi chi tiết
            // Trả về lỗi server nếu có bất kỳ lỗi nào xảy ra
            res.status(500).json({
                success: false,
                message: 'Lỗi server, vui lòng thử lại sau!'
            });
        }
    }
);



module.exports = router;