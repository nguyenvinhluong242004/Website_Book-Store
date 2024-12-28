const BookModel = require('../../models/User/book.model');

class DetailBookController {

    // [GET] /
    async index(req, res) {
        const { id } = req.query;

        console.log(id)

        console.log('Query params:', req.query);

        try {
            const result = await BookModel.getBook(
                parseInt(id)
            );

            const relatedBooks = await BookModel.getRandomBooksByGenre(result.data.genre, result.data.id_book);

            return res.json({
                success: true,
                message: 'Lấy thông tin sách thành công',
                data: result.data,
                reviews: result.review,              
                relatedBooks: relatedBooks.data      // 4 book liên quan
            });
        } catch (err) {
            console.error('Lỗi truy vấn!', err);
            return res.status(500).json({ error: 'Có lỗi xảy ra khi tìm kiếm' });
        }
    }

    


}

module.exports = new DetailBookController;