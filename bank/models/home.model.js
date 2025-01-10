const pool = require('../config/database'); // Kết nối đến cơ sở dữ liệu
const pool2 = require('../../backend/config/database'); // Kết nối đến cơ sở dữ liệu ở backend

class StatisticalModel {
    async getAmount() {
        try {
            const result = await pool.query(
                `SELECT TRIM(TO_CHAR(balance, '999G999G999G990')) AS balance
                 FROM account_bank
                 WHERE is_admin = true;`
            );

            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Error in getAmount:', error.message);
            throw new Error('Failed to fetch getAmount.');
        }
    }


    // Lấy số lượng sản phẩm đã bán theo danh mục
    async getLatestTransactions() {
        try {
            // Lấy dữ liệu từ bảng `Payment` và liên kết với `Account_Bank`
            const depositQuery = `
                SELECT 
                    p.ID_Payment,
                    p.Email,
                    TRIM(TO_CHAR(p.Amount, '999G999G999G990')) AS Amount,
                    p.Payment_Date,
                    ab.Account_ID,
                    TRIM(TO_CHAR(ab.Balance, '999G999G999G990')) AS Balance
                FROM Payment p
                JOIN Account_Bank ab ON p.Email = ab.Email
                ORDER BY p.Payment_Date DESC
                LIMIT 7;
            `;
            const depositResult = await pool.query(depositQuery);

            // Nếu không có giao dịch nào, trả về rỗng
            if (depositResult.rows.length === 0) {
                return [];
            }

            // Lấy danh sách email từ kết quả đầu tiên
            const emails = depositResult.rows.map((row) => row.email);

            // Truy vấn thông tin người dùng từ bảng `Users` dựa trên email
            const usersQuery = `
                SELECT 
                    Email,
                    Name AS full_name,
                    Phone AS phone_number
                FROM Users
                WHERE Email = ANY($1);
            `;
            const usersResult = await pool2.query(usersQuery, [emails]);

            // Tạo một map để ánh xạ email với thông tin người dùng
            const userMap = new Map(
                usersResult.rows.map((user) => [user.email, user])
            );

            // Kết hợp dữ liệu từ bảng `Payment` và `Users`
            const result = depositResult.rows.map((transaction) => {
                const userInfo = userMap.get(transaction.email) || {};
                return {
                    id_payment: transaction.id_payment,
                    email: transaction.email,
                    full_name: userInfo.full_name || null,
                    phone_number: userInfo.phone_number || null,
                    amount: transaction.amount,
                    payment_date: transaction.payment_date,
                    account_number: transaction.account_id,
                    balance: transaction.balance,
                };
            });

            return result;
        } catch (error) {
            console.error('Error in getLatestTransactions:', error.message);
            throw new Error('Failed to fetch latest transactions.');
        }
    }


}

module.exports = new StatisticalModel;
