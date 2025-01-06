const pool = require('../../config/database');

class UserModel {
    constructor() {
        this.pool = pool;
    }

    // CRUD
    // 1. Get all orders
    async getAllOrders() {
        const result = await this.pool.query("SELECT * FROM orders");
        return result.rows;
    }

    // 2. Get detail orders
    async getDetailOrder(id_order) {
        const query = `
            SELECT 
                o.id_order,
                o.email,
                o.total_amount,
                o.status,
                o.created_at,
                o.method,
                o.detail_address,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id_detail', d.id_detail,
                        'id_book', d.id_book,
                        'quantity', d.quantity,
                        'price', d.price,
                        'book_name', b.book_name
                    )
                ) AS books
            FROM 
                orders o
            JOIN 
                order_detail d 
            ON 
                o.id_order = d.id_order
            JOIN 
                book b
            ON 
                d.id_book = b.id_book
            WHERE 
                o.id_order = $1
            GROUP BY 
                o.id_order, o.email, o.total_amount, o.status, o.created_at, o.method
        `;
        try {
            const result = await this.pool.query(query, [id_order]);
            return result.rows;
        } catch (error) {
            console.error("Error fetching order details:", error);
            throw error;
        }
    }

    // 3. Update status of product
    async updateStatus(id_order, status) {
        const result = await this.pool.query(
            `UPDATE orders
            SET status = $1
            WHERE id_order = $2
            RETURNING *`,
            [status, id_order]
        );
        return result.rows[0];
    }

    // 4. Delete User
    async deleteUser(email) {
        const result = await this.pool.query(
            'DELETE FROM users WHERE email = $1 RETURNING *',
            [email]
        );
        return result.rows[0];
    }



    // 6. Get User by Refreshtoken
    async getUserByRefreshToken(refreshToken) {
        const result = await this.pool.query(
            'SELECT * FROM users WHERE refresh_token = $1',
            [refreshToken]
        );
        return result.rows[0];
    }

    // 7. Update user - refreshtoken
    async updateRefreshToken(email, refreshToken) {
        const result = await this.pool.query(
            `UPDATE users 
            SET refresh_token = $1
            WHERE email = $2
            RETURNING *`,
            [refreshToken, email]
        );
        return result.rows[0];
    }
}

module.exports = new UserModel(); 