const orderModel = require('../../models/admin/order.model');

class OrderController {
    // [GET]: admin/order?page=...&per_page=...
    async getAllOrders(req, res) {
        try {
            const { page = 1, per_page = 12 } = req.query;

            const pageNum = parseInt(page, 10);
            const perPageNum = parseInt(per_page, 10);

            const allOrders = await orderModel.getAllOrders(pageNum, perPageNum);

            const totalOrders = await orderModel.getTotalOrders();
            const totalPages = Math.ceil(totalOrders / perPageNum);
            // console.log('ALL ORDERS: ', allOrders);
            res.status(200).json({
                message: 'Thông tin toàn bộ đơn hàng được lấy thành công',
                page: pageNum,
                total_page: totalPages,
                per_page: perPageNum,
                total: totalOrders,
                orders: allOrders
            });
        } catch (err) {
            console.error('Lỗi trong quá trình lấy thông tin toàn bộ đơn hàng: ', err);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình lấy thông tin toàn bộ đơn hàng' });
        }
    }

    // [GET]: admin/order/detail/:id_order
    async getDetailOrder(req, res) {
        try {
            const id_order = req.params.id_order;
            const detailOrder = await orderModel.getDetailOrder(id_order);
            // console.log('DETAIL ORDER: ', detailOrder);
            res.status(200).json({
                message: 'Chi tiết đơn hàng được lấy thành công',
                detail: detailOrder
            });
        } catch (err) {
            console.error('Lỗi trong quá trình lấy chi tiết đơn hàng: ', err);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình lấy chi tiết đơn hàng' });
        }
    }

    // [GET]: admin/order/status?status=...&page=...&per_page=...
    async getOrdersByStatus(req, res){
        try {
            const { status, page = 1, per_page = 12 } = req.query;

            const pageNum = parseInt(page, 10);
            const perPageNum = parseInt(per_page, 10);

            const allOrders = await orderModel.getOrdersByStatus(status, pageNum, perPageNum);

            const totalOrders = await orderModel.getTotalOrdersByStatus(status);
            const totalPages = Math.ceil(totalOrders / perPageNum);
            // console.log('ALL ORDERS: ', allOrders);
            res.status(200).json({
                message: 'Thông tin toàn bộ đơn hàng được lấy thành công',
                page: pageNum,
                total_page: totalPages,
                per_page: perPageNum,
                total: totalOrders,
                orders: allOrders
            });
        } catch (err) {
            console.error('Lỗi trong quá trình lấy thông tin toàn bộ đơn hàng: ', err);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình lấy thông tin toàn bộ đơn hàng' });
        }
    }

    // [PATCH]: admin/order/update-status
    async updateStatusOfOrder(req, res) {
        try {
            const { id_order, status } = req.body;
            console.log('REQ BODY UPDATE STATUS: ', req.body);

            if (!id_order || !status) {
                return res.status(400).json({ message: 'Không nhận được id và status' });
            }

            const updatedOrder = await orderModel.updateStatus(id_order, status);

            if (!updatedOrder) {
                return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
            }

            res.status(200).json({
                message: 'Trạng thái đơn hàng được cập nhật thành công',
                updatedOrder: updatedOrder
            });
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng: ', error);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình cập nhật trạng thái đơn hàng' });
        }
    }
}

module.exports = new OrderController();