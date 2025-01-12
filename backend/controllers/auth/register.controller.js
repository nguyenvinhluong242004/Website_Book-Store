const axios = require('axios');
const userModel = require('../../models/user.model');
const bcrypt = require('bcrypt');
const https = require('https');

// Public thì bỏ đi
const agent = new https.Agent({
    rejectUnauthorized: false 
});


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

        // XỬ LÝ TẠO TÀI KHOẢN NGÂN HÀNG TẠI ĐÂY 
        try {
            const tokenResponse = await axios.post('https://localhost:6868/request-server/generate-token', {
                email: email
            }, { httpsAgent: agent }); // Public thì bỏ đi
            // Lấy token từ response
            const token = tokenResponse.data.token;  

            const data = { email }; 

            // Gửi dữ liệu kèm token đến server khác
            const response = await axios.post('https://localhost:6868/request-server/register', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Thêm token vào header
                    'Content-Type': 'application/json'
                },
                httpsAgent: agent // Public thì bỏ đi
            });

            console.log('Dữ liệu đã gửi thành công: ', response.data);
            // Mã 201: Tạo thành công
            res.status(201).json({ 'success': `Tài khoản và tài khoản ngân hàng đã được tạo thành công` });

        } catch (error) {
            console.error('Error khi gọi server tạo token hoặc đăng ký: ', error);
            res.status(500).json({ 'message': 'Không thể tạo tài khoản ngân hàng hoặc tạo token' });
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
