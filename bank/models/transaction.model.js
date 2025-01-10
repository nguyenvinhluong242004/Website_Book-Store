const pool = require('../config/database'); // Kết nối đến cơ sở dữ liệu
const pool2 = require('../../backend/config/database'); // Kết nối đến cơ sở dữ liệu ở backend

class StatisticalModel {
    async getPaginatedTransactions(page = 1, perPage = 7) {
        try {
            // Truy vấn tất cả giao dịch từ bảng Payment và Account_Bank
            const totalTransactionsQuery = `
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
        `;

            // Thực hiện truy vấn để lấy tất cả giao dịch
            const totalTransactionsResult = await pool.query(totalTransactionsQuery);
            const totalRecords = totalTransactionsResult.rows;

            // Tính toán phân trang
            const totalRecordsCount = totalRecords.length;
            const totalPages = Math.ceil(totalRecordsCount / perPage);
            const offset = (page - 1) * perPage;

            // Lấy các giao dịch cho trang hiện tại
            const paginatedTransactions = totalRecords.slice(offset, offset + perPage);

            // Lấy danh sách email từ kết quả đầu tiên
            const emails = paginatedTransactions.map((row) => row.email);

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
            const result = paginatedTransactions.map((transaction) => {
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

            return {
                data: result,              // Dữ liệu giao dịch của trang hiện tại
                total_records: totalRecordsCount, // Tổng số giao dịch
                total_pages: totalPages,    // Tổng số trang
                per_page: perPage,          // Số giao dịch mỗi trang
                current_page: page,         // Trang hiện tại
            };
        } catch (error) {
            console.error('Error in getPaginatedTransactions:', error.message);
            throw new Error('Failed to fetch paginated transactions.');
        }
    }

    async getFilteredPaginatedTransactions(page = 1, perPage = 7, fromDate = null, toDate = null) {
        try {
            let query = `
                SELECT 
                    p.ID_Payment,
                    p.Email,
                    TRIM(TO_CHAR(p.Amount, '999G999G999G990')) AS Amount,
                    p.Payment_Date,
                    ab.Account_ID,
                    TRIM(TO_CHAR(ab.Balance, '999G999G999G990')) AS Balance
                FROM Payment p
                JOIN Account_Bank ab ON p.Email = ab.Email
            `;

            let totalTransactionsResult;

            if (fromDate !== 'null' && toDate !== 'null' && fromDate && toDate) {
                query += ` WHERE p.Payment_Date >= $1 AND p.Payment_Date < $2`;
                query += ` ORDER BY p.Payment_Date DESC`;
                totalTransactionsResult = await pool.query(query, [fromDate, toDate]);
            }
            else {
                query += ` ORDER BY p.Payment_Date DESC`;
                totalTransactionsResult = await pool.query(query);
            }


            const totalRecords = totalTransactionsResult.rows;

            const totalRecordsCount = totalRecords.length;
            const totalPages = Math.ceil(totalRecordsCount / perPage);
            const offset = (page - 1) * perPage;

            const paginatedTransactions = totalRecords.slice(offset, offset + perPage);

            const emails = paginatedTransactions.map((row) => row.email);

            const usersQuery = `
                SELECT 
                    Email,
                    Name AS full_name,
                    Phone AS phone_number
                FROM Users
                WHERE Email = ANY($1);
            `;
            const usersResult = await pool2.query(usersQuery, [emails]);

            const userMap = new Map(
                usersResult.rows.map((user) => [user.email, user])
            );

            const result = paginatedTransactions.map((transaction) => {
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

            return {
                data: result,              // Dữ liệu giao dịch của trang hiện tại
                total_records: totalRecordsCount, // Tổng số giao dịch
                total_pages: totalPages,    // Tổng số trang
                per_page: perPage,          // Số giao dịch mỗi trang
                current_page: page,         // Trang hiện tại
            };
        } catch (error) {
            console.error('Error in getFilteredPaginatedTransactions:', error.message);
            throw new Error('Failed to fetch filtered paginated transactions.');
        }
    }


}

module.exports = new StatisticalModel;