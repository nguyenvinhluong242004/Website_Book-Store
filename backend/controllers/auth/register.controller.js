const userModel = require('../../models/auth/user.model');
const bcrypt = require('bcrypt');

const handleNewUser = async(req, res) => {
    console.log('BODY CLIENT SENT: ', req.body);
    const { email, pwd } = req.body;
    // Mã 400: Lỗi phía client
    if(!email || !pwd) return res.status(400).json({'message': 'Email and password are required. '});

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ 'message': 'Email has existed.' }); // Mã 409: Conflict
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(pwd, 10);

        // Tạo người dùng mới
        // Tại đây chỉ thêm hai trường email và password (Đã mã hóa) --> Còn lại thì để vào trang cài đặt cá nhân điền rồi thêm sau
        const newUser = await userModel.createUser(email, null, null, null, null, null, null, hashedPassword);

        // Trả về thông báo thành công
        // Mã 201: Tạo thành công
        res.status(201).json({ 'success': `New user with email ${email} created!`, 'user': newUser });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
