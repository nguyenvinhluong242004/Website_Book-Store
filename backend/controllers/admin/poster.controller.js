const posterModel = require('../../models/admin/poster.model');

class PosterController {
    // [GET]: admin/poster
    async getAllPoster(req, res) {
        try {
            const allPosters = await posterModel.getAllPosters();
            // console.log('ALL POSTERS: ', allPosters);
            res.status(200).json({
                message: 'Thông tin toàn bộ posters được lấy thành công',
                posters: allPosters
            });
        } catch (err) {
            console.error('Lỗi trong quá trình lấy toàn bộ poster: ', err);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình lấy thông tin toàn bộ poster' });
        }
    }

    // [POST]: admin/poster/add
    async addPoster(req, res) {
        try {
            const { name, product_link } = req.body;
            console.log('ADD POSTER BODY: ', req.body);

            console.log(req.files);
            const fileUrls = req.files && req.files.length > 0 ? req.files.map(file => file.path) : null;
            console.log(fileUrls);

            if (!name || !product_link) {
                return res.status(400).json({ message: 'Mọi trường đều phải được nhập' });
            }

            const newPoster = await posterModel.add(name, fileUrls, product_link);

            res.status(200).json({
                message: 'Poster được thêm thành công',
                poster: newPoster
            });
        } catch (error) {
            console.error('Lỗi trong quá trình thêm poster: ', error);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình thêm poster' });
        }
    }

}

module.exports = new PosterController();