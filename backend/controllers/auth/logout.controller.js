const userModel = require('../../models/auth/user.model');

handleLogout = async (req, res) => {
    try {
        const cookies = req.cookies;
        console.log('COOKIES LOGOUT: ', cookies);
        if (!cookies?.jwt) return res.sendStatus(204);
        const refreshToken = cookies.jwt;

        const foundUser = await userModel.getUserByRefreshToken(refreshToken);
        console.log('LOGOUT: ', foundUser);
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }); // secure: true --> Khi deploy thì thêm vào
            return res.sendStatus(204);
        };

        // Xóa ở trong database
        foundUser.refresh_token = '';
        const result = await userModel.updateRefreshToken(foundUser.email, foundUser.refresh_token); // Cập nhật lại refreshToken thành rỗng
        console.log('USER AFTER LOGOUT: ', result);

        res.clearCookie('jwt', { httpOnly: true }); // secure: true --> Khi deploy thì thêm vào
        res.sendStatus(204);
    } catch (err) {
        console.error('Error during logout:', err);
        res.sendStatus(500); // Internal Server Error
    }
}

module.exports = { handleLogout }