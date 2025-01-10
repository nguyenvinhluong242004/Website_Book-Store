const pool = require('../config/database'); // Kết nối đến cơ sở dữ liệu

class StatisticalModel {
    // Lấy danh sách từ bảng Request
    async getAccounts(page = 1, perPage = 10) {
        try {
            const requestQuery = `
                SELECT 
                    ID_Request,
                    Email,
                    TO_CHAR(Request_Date, 'HH24:MI:SS DD-MM-YYYY') AS Request_Date
                FROM Request
                ORDER BY Request_Date DESC
            `;
            const requestResult = await pool.query(requestQuery);
            const requests = requestResult.rows;

            // Pagination
            const totalRecords = requests.length;
            const totalPages = Math.ceil(totalRecords / perPage);
            const offset = (page - 1) * perPage;
            const paginatedRequests = requests.slice(offset, offset + perPage);

            return {
                data: paginatedRequests,
                total_records: totalRecords,
                total_pages: totalPages,
                per_page: perPage,
                current_page: page,
            };
        } catch (error) {
            console.error('Error in getAccounts:', error.message);
            throw new Error('Failed to fetch request list.');
        }
    }

    // Phê duyệt request và tạo tài khoản mới
    async approveRequest(email, initialBalance = 0) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN'); // Bắt đầu transaction

            // Kiểm tra nếu tài khoản đã tồn tại
            const checkQuery = `SELECT Email FROM Account_Bank WHERE Email = $1`;
            const checkResult = await client.query(checkQuery, [email]);
            if (checkResult.rowCount > 0) {
                throw new Error('Account already exists for this email.');
            }

            // Tạo tài khoản mới
            const insertQuery = `
                INSERT INTO Account_Bank (Email, Balance)
                VALUES ($1, $2)
            `;
            await client.query(insertQuery, [email, initialBalance]);

            // Xóa request sau khi phê duyệt
            const deleteRequestQuery = `
                DELETE FROM Request
                WHERE Email = $1
            `;
            await client.query(deleteRequestQuery, [email]);

            await client.query('COMMIT'); // Hoàn tất transaction
            console.log(`Account created successfully for email: ${email}`);
            return { success: true, message: 'Account created and request approved successfully.' };
        } catch (error) {
            await client.query('ROLLBACK'); // Rollback nếu gặp lỗi
            console.error('Error in approveRequest:', error.message);
            throw new Error('Failed to approve request.');
        } finally {
            client.release(); // Giải phóng client
        }
    }

    // Tạo request mới
    async createRequest(email) {
        try {
            const insertQuery = `
                INSERT INTO Request (Email, Request_Date)
                VALUES ($1, CURRENT_DATE)
            `;
            await pool.query(insertQuery, [email]);
            console.log(`Request created for email: ${email}`);
            return { success: true, message: 'Request created successfully.' };
        } catch (error) {
            console.error('Error in createRequest:', error.message);
            throw new Error('Failed to create request.');
        }
    }
}

module.exports = new StatisticalModel;
