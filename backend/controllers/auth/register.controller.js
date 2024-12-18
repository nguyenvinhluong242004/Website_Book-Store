const userModel = require('../../models/auth/user.model');
const bcrypt = require('bcrypt');

const handleNewUser = async(req, res) => {
    console.log('BODY CLIENT SENT: ', req.body);
    const { email, name, phone, pwd } = req.body;
    // Mã 400: Lỗi phía client
    if(!email || !pwd || !name || !phone) return res.status(400).json({'message': 'All field are required. '});

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
        // Mặc định người dùng đăng nhập sẽ có role là user: 1
        // createUser(email, name, phone, role, passwordorgoogleid)
        const userRole = 1;
        const newUser = await userModel.createUser(email, name, phone, userRole, hashedPassword);

        // Trả về thông báo thành công
        // Mã 201: Tạo thành công
        res.status(201).json({ 'success': `New user with email ${email} created!`, 'user': newUser });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
