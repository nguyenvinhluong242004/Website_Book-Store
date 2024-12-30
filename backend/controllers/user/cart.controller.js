const jwt = require('jsonwebtoken');
const cartModel = require('../../models/user/cart.model');

class CartController {
    // XỬ LÝ NGOÀI GIỎ HÀNG
    // [POST]: cart/add
    async addProduct(req, res) {
        const { id_book, quantity } = req.body;

        const authHeader = req.headers.authorization || req.headers.Authorization;
        // console.log('AUTH HEADER:', authHeader);

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
                existingProduct.quantity = existingProduct.quantity + quantity;
            } else {
                req.session.cart.push({ id_book, quantity: quantity });
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

    // XỬ LÝ TRONG GIỎ HÀNG
    // [PATCH]: cart/update
    async updateQuantityOfProduct(req, res) {
        const { id_book, quantity } = req.body;

        const authHeader = req.headers.authorization || req.headers.Authorization;
        // console.log('AUTH HEADER:', authHeader);

        if (!authHeader?.startsWith('Bearer ')) {
            if (!req.session.cart) {
                return res.status(400).json({
                    success: false,
                    message: "Cart is empty. Please add a product first.",
                });
            }

            // Tìm sản phẩm trong giỏ hàng tạm thời
            const existingProduct = req.session.cart.find(
                (item) => item.id_book === id_book
            );

            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found in cart.",
                });
            }

            // Cập nhật số lượng
            existingProduct.quantity = quantity;

            return res.json({
                success: true,
                message: "Product quantity updated in session.",
                cart: req.session.cart,
            });
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const email = decoded.UserInfo.email;

            const foundedBook = await cartModel.getBookByIDBook(email, id_book);

            if (!foundedBook) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found in database cart.",
                });
            }

            const updatedBook = await cartModel.updateNewQuantity(email, id_book, quantity);

            return res.json({
                success: true,
                message: "Product quantity updated in database successfully.",
                updatedBook: updatedBook,
            });

        } catch (err) {
            console.error(err);
            if (err.name === "JsonWebTokenError") {
                return res.status(403).json({
                    success: false,
                    message: "Invalid token. Access denied.",
                });
            }

            return res.status(500).json({
                success: false,
                message: "Error while updating product quantity.",
            });
        }
    }

    async deleteProduct(req, res) {
        const { id_book } = req.body;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        console.log('AUTH HEADER:', authHeader);

        if (!authHeader?.startsWith('Bearer ')) {
            if (!req.session.cart) {
                return res.status(404).json({
                    success: false,
                    message: "Cart is empty.",
                });
            }

            req.session.cart = req.session.cart.filter((item) => item.id_book !== id_book);

            return res.json({
                success: true,
                message: "Product removed from session cart successfully.",
                cart: req.session.cart,
            });
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const email = decoded.UserInfo.email;

            const deletedProduct = await cartModel.deleteProductFromCart(email, id_book);

            if (!deletedProduct.rowCount) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found in cart.",
                });
            }

            return res.json({
                success: true,
                message: "Product removed from database cart successfully.",
            });

        } catch (err) {
            console.error(err);
            if (err.name === "JsonWebTokenError") {
                return res.status(403).json({
                    success: false,
                    message: "Invalid token. Access denied.",
                });
            }

            return res.status(500).json({
                success: false,
                message: "Error while deleting product.",
            });
        }
    }
}

module.exports = new CartController();