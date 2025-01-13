const axios = require('axios');
const userModel = require('../../models/user.model');
const bcrypt = require('bcrypt');
const https = require('https');

const pool = require('../../config/database');

// Public thì bỏ đi
const agent =
    process.env.NODE_ENV === 'development'
        ? new https.Agent({ rejectUnauthorized: false })
        : undefined;

// [POST]: /register
const handleNewUser = async (req, res) => {
    const client = await pool.connect();
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
        await client.query('BEGIN');
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

        if (!response.data.success) {
            throw new Error('Không thể tạo tài khoản ngân hàng');
        }

        await client.query('COMMIT');
        res.status(201).json({ success: 'Tài khoản và tài khoản ngân hàng đã được tạo thành công' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error: ', error.message);
        if (error.message === 'Không thể tạo tài khoản ngân hàng') {
            res.status(502).json({ message: error.message }); 
        } else {
            res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau' }); 
        }
    } finally {
        client.release(); 
    }
}

module.exports = { handleNewUser };
