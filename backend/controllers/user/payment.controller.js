const orderModel = require('../../models/user/order.model');
const cartModel = require('../../models/user/cart.model');
const bookModel = require('../../models/user/book.model');

class PaymentController {
    async addProductToPayment(req, res){
        try {
            // Lấy danh sách {id_book, quantity}
            const cartItems = req.body.cart; 
    
            if (!Array.isArray(cartItems)) {
                return res
                    .status(400)
                    .json({ error: 'Dữ liệu nhận không phải là mảng' });
            }
            const newIdOrder = await orderModel.getLastIdOrder() + 1;

            // Lưu danh sách giỏ hàng vào session
            req.session.id_order = newIdOrder;
            req.session.selectedItem = cartItems;
    
            console.log('SAVED CART ITEM INTO SESSION: ', req.session.selectedItem);
            console.log('SESSION HERE: ', req.session);
    
            return res.status(200).json({ 
                message: 'Sản phẩm được lưu vào session thành công',
                id_order: req.session.id_order,
                selectedItem: req.session.selectedItem
            });
        } catch (error) {
            console.error('Lỗi trong quá trình lưu sản phẩm vào session', error);
            return res.status(500).json({ error: 'Lỗi server' });
        }  
    }

    async getPaymentForm(req, res){
        try {
            const id_order = req.session.id_order;
            const selectedItems = req.session.selectedItem;

            
    
            return res.status(200).json({ 
                
            });
        } catch (error) {
            console.error('Lỗi trong quá trình lấy thông tin hiện ra payment', error);
            return res.status(500).json({ error: 'Lỗi server' });
        }  
    }
}

module.exports = new PaymentController();