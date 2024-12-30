const jwt = require('jsonwebtoken');
const cartModel = require('../../models/user/cart.model');

class CartController {
    async addProduct(req, res) {
        const { id_book, quantity } = req.body;

        const authHeader = req.headers.authorization || req.headers.Authorization;
        console.log('AUTH HEADER:', authHeader);

        // Nếu không có Authorization header, lưu vào session
        if (!authHeader?.startsWith('Bearer ')) {
            if (!req.session.cart) {
                req.session.cart = [];
            }

            // Kiểm tra sản phẩm có sẵn trong giỏ hàng tạm thời chưa
            const existingProduct = req.session.cart.find(
                (item) => item.id_book === id_book
            );

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                req.session.cart.push({ id_book, quantity });
            }

            return res.json({
                success: true,
                message: "Sản phẩm được thêm vào giỏ hàng tạm thành công",
                cart: req.session.cart,
            });
        }

        // Nếu có Authorization header, xác minh JWT
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const email = decoded.UserInfo.email;
            // const role = decoded.UserInfo.role;

            const foundedBook = await cartModel.getBookByIDBook(email, id_book);
            let addedBook;
            if (!foundedBook) {
                // Nếu chưa có trong giỏ hàng thì thêm sản phẩm vào cơ sở dữ liệu
                addedBook = await cartModel.addBookIntoCart(email, id_book, quantity);
            } else {
                // Nếu sản phẩm đã có trong giỏ hàng thì chỉ cập nhật số lượng
                addedBook = await cartModel.updateQuantity(email, id_book, quantity);
            }

            return res.json({
                success: true,
                message: "Sản phẩm được thêm vào giỏ hàng trong database thành công",
                addedBook: addedBook
            });

        } catch (err) {
            console.error(err);

            // Kiểm tra lỗi token không hợp lệ
            if (err.name === "JsonWebTokenError") {
                return res.status(403).json({
                    success: false,
                    message: "Sai token, từ chối thêm",
                });
            }

            // Các lỗi khác
            return res.status(500).json({
                success: false,
                message: "Đã xảy ra lỗi trong quá trình thêm sản phẩm",
            });
        }
    }
}

module.exports = new CartController();