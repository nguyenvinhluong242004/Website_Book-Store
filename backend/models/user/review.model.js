const pool = require('../../config/database');

class ReviewModel {
    constructor() {
        this.pool = pool;
    }

    async addReview(id_book, email, date, rating, content, image_link) {
        try {
            const result = await this.pool.query(
                'INSERT INTO Review (id_book, email, date, rating, content, image_link, like_count) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [id_book, email, date, rating, content, image_link, 0]
            );
            return result.rows[0]; // Trả về hàng vừa được chèn
        } catch (error) {
            console.error('Error adding review:', error.message); // Log lỗi ra console
            throw new Error('Could not add review to the database.'); // Ném lỗi để controller xử lý
        }
    }
}

module.exports = new ReviewModel();
