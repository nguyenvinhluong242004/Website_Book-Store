const userModel = require('../../models/user.model');
const bcrypt = require('bcrypt');

// [POST]: /register
const handleNewUser = async (req, res) => {
    // console.log('BODY CLIENT SENT: ', req.body);
    const { email, name, phone, password, confirmedPassword } = req.body;
    console.log('REQ BODY: ', req.body);
    // Mã 400: Lỗi phía client
    if (!email || !password || !confirmedPassword || !name || !phone) return res.status(400).json({ 'message': 'Các trường đều phải được nhập' });

    // Kiểm tra password và confirmedPassword
    if (password !== confirmedPassword) {
        return res.status(400).json({ 'message': 'Mật khẩu không trùng khớp' });
    }

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await userModel.getUserByEmail(email); 
        if (existingUser) {
            return res.status(409).json({ 'message': 'Email đã được đăng ký' }); // Mã 409: Conflict
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        const userRole = 1;
        const newUser = await userModel.createUser(email, name, phone, userRole, hashedPassword);

        // Mã 201: Tạo thành công
        res.status(201).json({ 'success': `Tài khoản đã được tạo thành công`});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
