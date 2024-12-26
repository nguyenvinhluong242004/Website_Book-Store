const pool = require('../../config/database'); // Kết nối đến cơ sở dữ liệu

class BookModel {
    /**
     * Tìm kiếm sách dựa trên từ khóa tìm kiếm
     */
    static async getBook(id) {
        const result = await pool.query(
            `SELECT * FROM Book 
                WHERE ID_Book = $1`,
            [id]
        );

        return {
            data: result.rows[0] || {},
        };
    }

    /**
     * Tìm kiếm loại sách dựa trên từ khóa tìm kiếm
     */
    static async findBookTypesByGenre(genre, page = 1, perPage = 10) {
        const searchGenre = `${genre}`;
        const offset = (page - 1) * perPage; // Bản ghi bắt đầu cho phân trang

        // Đếm tổng số bản ghi phù hợp
        const countResult = await pool.query(
            `SELECT COUNT(*) AS total FROM Book WHERE Genre ILIKE $1`,
            [searchGenre]
        );
        const totalRecords = parseInt(countResult.rows[0].total, 10);

        // Lấy dữ liệu phân trang
        const result = await pool.query(
            `SELECT * FROM Book 
             WHERE Genre ILIKE $1
             LIMIT $2 OFFSET $3`,
            [searchGenre, perPage, offset]
        );

        return {
            data: result.rows,          // Dữ liệu loại sách
            total_records: totalRecords, // Tổng số bản ghi
            total_pages: Math.ceil(totalRecords / perPage), // Tổng số trang
            per_page: perPage,          // Số bản ghi mỗi trang
            current_page: page,         // Trang hiện tại
        };
    }

    /**
     * Tìm kiếm loại sách dựa trên các bộ lọc
     */
    static async findBookTypesByFilters({
        genre,
        page = 1,
        perPage = 10,
        startPrice,
        endPrice,
        age,
        discounted_price = null,  // Mặc định sắp xếp giá từ thấp đến cao
        sold_quantity = null,      // Bỏ qua nếu không muốn sắp xếp theo số lượng bán
        rating_count = null        // Bỏ qua nếu không muốn sắp xếp theo đánh giá
    }) {
        const searchGenre = `${genre}`;
        const offset = (page - 1) * perPage;

        const conditions = [];
        const values = [];

        // Xây dựng các điều kiện lọc
        if (genre) {
            conditions.push('Genre ILIKE $1');
            values.push(searchGenre);
        }
        if (startPrice !== undefined) {
            conditions.push('Discounted_Price >= $' + (values.length + 1));
            values.push(startPrice);
        }
        if (endPrice !== undefined) {
            conditions.push('Discounted_Price <= $' + (values.length + 1));
            values.push(endPrice);
        }
        if (age) {
            conditions.push('Age_Group ILIKE $' + (values.length + 1));
            values.push(age);
        }

        const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

        // Đếm tổng số bản ghi
        const countQuery = `SELECT COUNT(*) AS total FROM Book ${whereClause}`;
        const countResult = await pool.query(countQuery, values);
        const totalRecords = parseInt(countResult.rows[0].total, 10);

        // Kiểm tra điều kiện sắp xếp
        let orderConditions = [];

        if (discounted_price !== null) {
            orderConditions.push(`Discounted_Price ${discounted_price}`);
        } else if (sold_quantity !== null) {
            orderConditions.push(`Sold_Quantity ${sold_quantity}`);
        } else if (rating_count !== null) {
            orderConditions.push(`Rating_Count ${rating_count}`);
        }

        const orderBy = orderConditions.length ? `ORDER BY ${orderConditions.join(', ')}` : '';

        // Lấy dữ liệu phân trang
        const dataQuery = `
            SELECT * FROM Book
            ${whereClause} 
            ${orderBy}
            LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(perPage, offset);

        const result = await pool.query(dataQuery, values);

        return {
            data: result.rows,
            total_records: totalRecords,
            total_pages: Math.ceil(totalRecords / perPage),
            per_page: perPage,
            current_page: page,
        };
    }

}

module.exports = BookModel;
