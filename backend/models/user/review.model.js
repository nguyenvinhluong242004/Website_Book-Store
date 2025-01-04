const pool = require('../../config/database');

class ReviewModel {
    constructor() {
        this.pool = pool;
    }

    async addReview(id_book, email, date, rating, content, image_link) {
        const client = await this.pool.connect(); // Kết nối client để bắt đầu transaction
        try {
            await client.query('BEGIN'); // Bắt đầu transaction

            // Thêm review vào bảng Review
            const reviewResult = await client.query(
                'INSERT INTO Review (id_book, email, date, rating, content, image_link, like_count) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [id_book, email, date, rating, content, image_link, 0]
            );

            // Tăng rating_count cho sách trong bảng Book
            await client.query(
                'UPDATE Book SET Rating_Count = Rating_Count + 1 WHERE ID_Book = $1',
                [id_book]
            );

            await client.query('COMMIT'); // Commit transaction

            return reviewResult.rows[0]; // Trả về review vừa được chèn
        } catch (error) {
            await client.query('ROLLBACK'); // Rollback nếu có lỗi
            console.error('Error adding review:', error.message);
            throw new Error('Could not add review to the database.');
        } finally {
            client.release(); // Giải phóng client
        }
    }
}

module.exports = new ReviewModel();
