const pool = require('../config/database'); // Kết nối đến cơ sở dữ liệu

class StatisticalModel {
    async createRequest(email) {
        const client = await pool.connect();

        try {
            // Bắt đầu transaction
            await client.query('BEGIN');

            // Kiểm tra xem email đã có yêu cầu trong bảng Request chưa
            const checkQuery = `SELECT Email FROM Request WHERE Email = $1`;
            const checkResult = await client.query(checkQuery, [email]);

            if (checkResult.rowCount > 0) {
                // Nếu đã có yêu cầu với email này
                throw new Error('Request already exists for this email.');
            }

            const checkQuery2 = `SELECT Email FROM Account_Bank WHERE Email = $1`;
            const checkResult2 = await client.query(checkQuery2, [email]);

            if (checkResult2.rowCount > 0) {
                // Nếu đã có yêu cầu với email này
                throw new Error('Request already exists for this email.');
            }

            // Nếu chưa có yêu cầu, tạo yêu cầu mới
            const insertQuery = `
                INSERT INTO Request (Email, Request_Date)
                VALUES ($1, CURRENT_TIMESTAMP)
            `;
            await client.query(insertQuery, [email]);

            // Commit transaction
            await client.query('COMMIT');
            console.log(`Request created successfully for email: ${email}`);
            return { success: true, message: 'Request created successfully.' };
        } catch (error) {
            // Rollback transaction nếu có lỗi
            await client.query('ROLLBACK');
            console.error('Error in createRequest:', error.message);
            throw new Error('Failed to create request.');
        } finally {
            // Giải phóng client
            client.release();
        }
    }
    async processPayment(email, idInvoice, amount, adminEmail) {
        const client = await pool.connect();

        try {
            // Bắt đầu transaction
            await client.query('BEGIN');

            // Kiểm tra xem email đã có tài khoản trong bảng Account_Bank chưa
            const checkAccountQuery = `SELECT Email, Balance FROM Account_Bank WHERE Email = $1`;
            const accountResult = await client.query(checkAccountQuery, [email]);

            if (accountResult.rowCount === 0) {
                throw new Error('No account found for this email.');
            }

            const accountBalance = parseInt(accountResult.rows[0].balance);
            amount = parseInt(amount);

            // Kiểm tra số dư tài khoản có đủ để thanh toán không
            if (accountBalance < amount) {
                throw new Error('Insufficient balance for payment.');
            }

            // Lấy số dư trước khi thanh toán để thêm vào lịch sử giao dịch
            const balanceBeforeUser = accountBalance;

            // Trừ số dư tài khoản của người dùng
            const updateBalanceQuery = `
                UPDATE Account_Bank
                SET Balance = Balance - $1
                WHERE Email = $2
            `;
            await client.query(updateBalanceQuery, [amount, email]);

            // Lấy thông tin của admin để tạo bản ghi lịch sử giao dịch
            const adminBalanceQuery = `SELECT Email, Balance FROM Account_Bank WHERE Is_Admin = TRUE`;
            const adminResult = await client.query(adminBalanceQuery);
            const adminBalance = parseInt(adminResult.rows[0].balance);
            const adminEmail = adminResult.rows[0].email;

            // Cập nhật số dư cho tài khoản admin
            const updateAdminBalanceQuery = `
                UPDATE Account_Bank
                SET Balance = Balance + $1
                WHERE Is_Admin = TRUE
            `;
            await client.query(updateAdminBalanceQuery, [amount]);

            // Thêm vào bảng User_Transaction_History
            const insertUserHistoryQuery = `
                INSERT INTO User_Transaction_History (Email, Admin_Email, Transaction_Type, Amount, Balance_Before, Balance_After, Description)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `;
            await client.query(insertUserHistoryQuery, [
                email,
                adminEmail,  // Admin thực hiện giao dịch
                'Payment',  // Loại giao dịch
                amount,  // Số tiền giao dịch
                balanceBeforeUser,  // Số dư trước khi thanh toán
                accountBalance - amount,  // Số dư sau khi thanh toán
                `Thanh toán đơn hàng #${idInvoice}`  // Mô tả giao dịch
            ]);

            // Thêm vào bảng Admin_Transaction_History
            const insertAdminHistoryQuery = `
                INSERT INTO Admin_Transaction_History (Admin_Email, User_Email, Amount, Balance_Before, Balance_After, Description)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;
            await client.query(insertAdminHistoryQuery, [
                adminEmail,  // Email của admin thực hiện giao dịch
                email,  // Email của người dùng thực hiện thanh toán
                amount,  // Số tiền giao dịch
                adminBalance,  // Số dư trước khi giao dịch của admin
                adminBalance + amount,  // Số dư sau khi giao dịch của admin
                `Nhận tiền thanh toán đơn hàng #${idInvoice}`  // Mô tả giao dịch
            ]);

            // Tạo bản ghi Payment
            const insertPaymentQuery = `
                INSERT INTO Payment (ID_Invoice, Email, Payment_Date, Amount)
                VALUES ($1, $2, CURRENT_TIMESTAMP, $3)
            `;
            await client.query(insertPaymentQuery, [idInvoice, email, amount]);

            // Commit transaction
            await client.query('COMMIT');
            console.log(`Payment processed successfully for email: ${email}, Amount: ${amount}`);
            return { success: true, message: 'Payment processed successfully.' };
        } catch (error) {
            // Rollback transaction nếu có lỗi
            await client.query('ROLLBACK');
            console.error('Error in processPayment:', error.message);
            throw new Error('Failed to process payment.');
        } finally {
            // Giải phóng client
            client.release();
        }
    }

}

module.exports = new StatisticalModel;
