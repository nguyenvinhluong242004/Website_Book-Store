const pool = require('../config/database'); // Kết nối đến cơ sở dữ liệu
const pool2 = require('../../backend/config/database'); // Kết nối đến cơ sở dữ liệu ở backend

class StatisticalModel {
    async getAccounts(page = 1, perPage = 10) {
        try {
            // Truy vấn danh sách tài khoản không phải admin
            const accountsQuery = `
                SELECT 
                    Account_ID,
                    Email,
                    TRIM(TO_CHAR(Balance, '999G999G999G990')) AS Balance
                FROM Account_Bank
                WHERE Is_Admin = FALSE
                ORDER BY Account_ID ASC
            `;
            const accountsResult = await pool.query(accountsQuery);
            const accounts = accountsResult.rows;

            // Pagination
            const totalRecords = accounts.length;
            const totalPages = Math.ceil(totalRecords / perPage);
            const offset = (page - 1) * perPage;
            const paginatedAccounts = accounts.slice(offset, offset + perPage);

            // Lấy danh sách email từ kết quả đã phân trang
            const emails = paginatedAccounts.map((row) => row.email);

            // Truy vấn thông tin người dùng từ bảng Users dựa trên email
            const usersQuery = `
                SELECT 
                    Email,
                    Name AS full_name,
                    Phone AS phone_number
                FROM Users
                WHERE Email = ANY($1)
            `;
            const usersResult = await pool2.query(usersQuery, [emails]);

            // Tạo map để ánh xạ email với thông tin người dùng
            const userMap = new Map(
                usersResult.rows.map((user) => [user.email, user])
            );

            // Kết hợp thông tin tài khoản và người dùng
            const result = paginatedAccounts.map((account) => {
                const userInfo = userMap.get(account.email) || {};
                return {
                    account_id: account.account_id,
                    email: account.email,
                    full_name: userInfo.full_name || null,
                    phone_number: userInfo.phone_number || null,
                    balance: account.balance,
                };
            });

            return {
                data: result,
                total_records: totalRecords,
                total_pages: totalPages,
                per_page: perPage,
                current_page: page,
            };
        } catch (error) {
            console.error('Error in getAccounts:', error.message);
            throw new Error('Failed to fetch account list.');
        }
    }

    async updateBalance(id = 0, balance = 0) {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (id <= 0 || balance < 0) {
                throw new Error('Invalid account ID or balance.');
            }

            // Câu lệnh SQL cập nhật số dư
            const updateQuery = `
                UPDATE Account_Bank
                SET Balance = $1
                WHERE Account_ID = $2 AND Is_Admin = false
            `;

            // Gửi truy vấn đến cơ sở dữ liệu
            const result = await pool.query(updateQuery, [balance, id]);

            // Kiểm tra nếu không có dòng nào bị ảnh hưởng
            if (result.rowCount === 0) {
                throw new Error(`Account with ID ${id} not found.`);
            }

            console.log(`Balance for account ID ${id} updated to ${balance}.`);
            return { success: true, message: 'Balance updated successfully.' };
        } catch (error) {
            console.error('Error in updateBalance:', error.message);
            throw new Error('Failed to update balance.');
        }
    }

}

module.exports = new StatisticalModel;
