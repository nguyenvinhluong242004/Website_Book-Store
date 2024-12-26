const BookModel = require('../../models/User/book.model');

class DetailBookController {

    // [GET] /
    async index(req, res) {
        const { id } = req.query;

        console.log(id)

        console.log('Query params:', req.query);

        try {
            const result = await BookModel.getBook(
                id
            );

            return res.json({
                success: true,
                message: 'Lấy thông tin sách thành công',
                data: result.data,
            });
        } catch (err) {
            console.error('Lỗi truy vấn!', err);
            return res.status(500).json({ error: 'Có lỗi xảy ra khi tìm kiếm' });
        }
    }

    


}

module.exports = new DetailBookController;