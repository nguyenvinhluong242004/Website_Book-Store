const pool = require('../../config/database');

class OrderModel {
    constructor() {
        this.pool = pool;
    }

    // CRUD
    // Get total orders
    async getTotalOrdersByEmail(email) {
        const result = await this.pool.query(
            "SELECT COUNT(*) FROM orders WHERE email = $1",
            [email]
        );
        return parseInt(result.rows[0].count, 10);
    }
    // Get all orders
    async getAllOrdersByEmail(email, page, per_page) {
        const offset = (page - 1) * per_page;

        const result = await this.pool.query(
            "SELECT * FROM orders WHERE email = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
            [email, per_page, offset]
        );
        return result.rows;
    }
    // Get detail items of order
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
}

module.exports = new OrderModel(); 