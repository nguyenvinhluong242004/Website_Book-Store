const pool = require('../../config/database'); // Kết nối đến cơ sở dữ liệu

class BookModel {
    /**
     * Tìm kiếm sách dựa trên từ khóa tìm kiếm
     */
    static async getBook(id) {
        // Lấy thông tin sách và tên thể loại từ bảng Categories
        const result = await pool.query(
            `SELECT b.*, c.Name AS genre_name 
             FROM Book b
             LEFT JOIN Categories c ON b.Genre = c.ID_Category
             WHERE b.ID_Book = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return { data: {}, review: [] }; // Trường hợp không tìm thấy sách
        }

        // Lấy hình ảnh của sách
        const imgQuery = `SELECT Image_Link FROM Img_Book WHERE ID_Book = $1`;
        const imgResult = await pool.query(imgQuery, [result.rows[0].id_book]);
        result.rows[0].images = imgResult.rows.map(img => img.image_link); // Gán ảnh vào sách

        // Lấy các đánh giá (reviews) của sách và thông tin người dùng từ bảng Users
        const reviewQuery = `
            SELECT r.ID_Review, r.Email, r.Date, r.Rating, r.Content, r.Image_Link, r.Like_Count, u.Name AS user_name
            FROM Review r
            LEFT JOIN Users u ON r.Email = u.Email
            WHERE r.ID_Book = $1
            ORDER BY r.Date DESC`;  // Sắp xếp theo ngày đánh giá
        const reviewResult = await pool.query(reviewQuery, [id]);

        // Trả về dữ liệu sách và đánh giá (có tên người dùng)
        return {
            data: result.rows[0], // Thông tin sách
            review: reviewResult.rows // Danh sách đánh giá kèm tên người dùng
        };
    }


    /**
     * Tìm kiếm loại sách dựa trên từ khóa tìm kiếm
     */
    static async findBookTypesByGenre(genreId, page = 1, perPage = 10) {
        const offset = (page - 1) * perPage; // Bản ghi bắt đầu cho phân trang

        // Đếm tổng số bản ghi phù hợp
        const countResult = await pool.query(
            `SELECT COUNT(*) AS total 
             FROM Book 
             WHERE Genre = $1`,
            [genreId]
        );
        const totalRecords = parseInt(countResult.rows[0].total, 10);

        // Lấy dữ liệu phân trang
        const result = await pool.query(
            `SELECT b.*, c.Name AS genre_name
             FROM Book b
             LEFT JOIN Categories c ON b.Genre = c.ID_Category
             WHERE b.Genre = $1
             LIMIT $2 OFFSET $3`,
            [genreId, perPage, offset]
        );

        // Lặp qua các sách và lấy ảnh cho mỗi sách
        for (let book of result.rows) {
            const imgQuery = `SELECT Image_Link FROM Img_Book WHERE ID_Book = $1`;
            const imgResult = await pool.query(imgQuery, [book.id_book]);
            book.images = imgResult.rows.map(img => img.image_link); // Gán ảnh vào sách
        }

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
        genreId,
        page = 1,
        perPage = 10,
        startPrice,
        endPrice,
        age,
        discounted_price = null,  // Mặc định sắp xếp giá từ thấp đến cao
        sold_quantity = null,      // Bỏ qua nếu không muốn sắp xếp theo số lượng bán
        rating_count = null        // Bỏ qua nếu không muốn sắp xếp theo đánh giá
    }) {
        const offset = (page - 1) * perPage;
        const searchAge = `%${age}%`;

        const conditions = [];
        const values = [];

        console.log(genreId)

        // Xây dựng các điều kiện lọc
        if (genreId) {
            conditions.push('b.Genre = $' + (values.length + 1));
            values.push(genreId);
        }
        if (startPrice !== undefined) {
            conditions.push('b.Discounted_Price >= $' + (values.length + 1));
            values.push(startPrice);
        }
        if (endPrice !== undefined) {
            conditions.push('b.Discounted_Price <= $' + (values.length + 1));
            values.push(endPrice);
        }
        if (age) {
            conditions.push('b.Age_Group ILIKE $' + (values.length + 1));
            values.push(searchAge);
        }

        const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

        // Đếm tổng số bản ghi
        const countQuery = `SELECT COUNT(*) AS total FROM Book b ${whereClause}`;
        const countResult = await pool.query(countQuery, values);
        const totalRecords = parseInt(countResult.rows[0].total, 10);

        // Kiểm tra điều kiện sắp xếp
        let orderConditions = [];

        if (discounted_price !== null) {
            orderConditions.push(`b.Discounted_Price ${discounted_price}`);
        } else if (sold_quantity !== null) {
            orderConditions.push(`b.Sold_Quantity ${sold_quantity}`);
        } else if (rating_count !== null) {
            orderConditions.push(`b.Rating_Count ${rating_count}`);
        }

        const orderBy = orderConditions.length ? `ORDER BY ${orderConditions.join(', ')}` : '';

        // Lấy dữ liệu phân trang
        const dataQuery = `
            SELECT b.*, c.Name AS genre_name
            FROM Book b
            LEFT JOIN Categories c ON b.Genre = c.ID_Category
            ${whereClause} 
            ${orderBy}
            LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(perPage, offset);

        const result = await pool.query(dataQuery, values);

        // Lặp qua các sách và lấy ảnh cho mỗi sách
        for (let book of result.rows) {
            const imgQuery = `SELECT Image_Link FROM Img_Book WHERE ID_Book = $1`;
            const imgResult = await pool.query(imgQuery, [book.id_book]);
            book.images = imgResult.rows.map(img => img.image_link); // Gán ảnh vào sách
        }

        return {
            data: result.rows,
            total_records: totalRecords,
            total_pages: Math.ceil(totalRecords / perPage),
            per_page: perPage,
            current_page: page,
        };
    }

    /**
 * Lấy 4 sách ngẫu nhiên từ một thể loại, khác với sách có ID được chỉ định
 */
    static async getRandomBooksByGenre(genreId, id_book) {
        const result = await pool.query(
            `SELECT b.*, c.Name AS Genre_Name 
         FROM Book b
         LEFT JOIN Categories c ON b.Genre = c.ID_Category
         WHERE b.Genre = $1 AND b.ID_Book != $2
         ORDER BY RANDOM() 
         LIMIT 4`,
            [genreId, id_book]
        );

        // Lặp qua các sách và lấy ảnh cho mỗi sách
        for (let book of result.rows) {
            const imgQuery = `SELECT Image_Link FROM Img_Book WHERE ID_Book = $1`;
            const imgResult = await pool.query(imgQuery, [book.id_book]);
            book.images = imgResult.rows.map(img => img.image_link); // Gán ảnh vào sách
        }

        return {
            data: result.rows,
        };
    }


}

module.exports = BookModel;

