const HomeModel = require('../../models/User/home.model');

class HomeController {

    // [GET] /
    async index(req, res) {
        try {
            const posters = await HomeModel.getPosters();
            const topBooks = await HomeModel.getTopSellingBooks();
            const economyBooks = await HomeModel.getRandomBooksByGenre(3);
            const psychologyBooks = await HomeModel.getRandomBooksByGenre(4);
            const literaryBooks = await HomeModel.getRandomBooksByGenre(6);
            const novelBooks = await HomeModel.getRandomBooksByGenre(7);

            return res.json({
                success: true,
                message: 'Lấy thông tin sách thành công',
                posters: posters.data,                  // poster
                topBooks: topBooks.data,                // Top 4 sách bán chạy
                economyBooks: economyBooks.data,        // 4 sách thuộc Kinh tế
                psychologyBooks: psychologyBooks.data,  // 4 sách thuộc Tâm lý
                literaryBooks: literaryBooks.data,      // 4 sách thuộc Văn học
                novelBooks: novelBooks.data,            // 4 sách thuộc Tiểu thuyết
            });
        } catch (err) {
            console.error('Lỗi truy vấn!', err);
            return res.status(500).json({ error: 'Có lỗi xảy ra khi load web' });
        }
    }
}

module.exports = new HomeController;