const bcrypt = require('bcrypt');

const userModel = require('../../models/user.model');
const addressModel = require('../../models/user/address.model');
const orderModel = require('../../models/user/order.model');


class AccountController {
    // [GET]: /account/profile
    async getProfile(req, res) {
        try {
            const email = req.email;
            const userProfile = await userModel.getProfileByEmail(email);
            console.log('USER PROFILE', userProfile);
            if (!userProfile) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }
            res.status(200).json({
                message: 'Thông tin tài khoản được lấy thành công',
                user: userProfile
            });
        } catch (err) {
            console.error('Lỗi trong quá trình lấy thông tin tài khoản: ', err);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình lấy thông tin người dùng' });
        }
    }

    // [PUT]: /account/profile
    async updateProfile(req, res) {
        try {
            const { name, phone, gender, birthday } = req.body;
            // console.log('REQ BODY: ', req.body);
            const email = req.email;
            // console.log('EMAIL: ', email); 

            if (!name || !phone || !gender || !birthday) {
                return res.status(400).json({ message: 'Mọi trường đều phải được nhập' });
            }

            const updatedUser = await userModel.updateUser(email, { name, phone, gender, birthday });

            if (!updatedUser) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            res.status(200).json({
                message: 'Tài khoản được cập nhật thành công',
                updatedUser: updatedUser
            });
        } catch (error) {
            console.error('Lỗi trong quá trình cập nhật tài khoản: ', error);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình cập nhật tài khoản' });
        }
    }

    // [GET]: /account/address?page=...&per_page=...
    async getAllAddress(req, res) {
        try {
            const email = req.email;
            const { page = 1, per_page = 12 } = req.query;
            const pageNum = parseInt(page, 10);
            const perPageNum = parseInt(per_page, 10);

            const allAddress = await addressModel.getAllAddress(email, pageNum, perPageNum);

            const totalAddress = await addressModel.getTotalAddress(email);
            const totalPages = Math.ceil(totalAddress / perPageNum);

            res.status(200).json({
                message: 'Địa chỉ được lấy thành công',
                page: pageNum,
                total_page: totalPages,
                per_page: perPageNum,
                total: totalAddress,
                allAddress: allAddress
            });
        } catch (error) {
            console.error('Lỗi trong quá trình lấy địa chỉ: ', error);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình lấy địa chỉ' });
        }
    }

    // [POST]: /account/create-address
    async createAddress(req, res) {
        try {
            const { name, phone, country, city, district, ward, address } = req.body;
            // console.log('REQ BODY ADDRESS: ', req.body);
            const email = req.email;
            // console.log('EMAIL: ', email); 

            if (!name || !phone || !country || !city || !district || !ward || !address) {
                return res.status(400).json({ message: 'Mọi trường đều phải được nhập' });
            }

            const newAddress = await addressModel.createAddress(name, phone, country, city, district, ward, address, email);

            res.status(200).json({
                message: 'Địa chỉ được tạo thành công',
                address: newAddress
            });
        } catch (error) {
            console.error('Lỗi trong quá trình thêm địa chỉ: ', error);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình thêm địa chỉ' });
        }
    }

    // [PUT]: account/update-address
    async updateAddress(req, res) {
        try {
            const { id_address } = req.params;
            // console.log('ID ADDRESS: ', id_address);
            const { name, phone, country, city, district, ward, address } = req.body;
            // console.log('REQ BODY UPDATE ADDRESS: ', req.body);
            const email = req.email;
            // console.log('EMAIL: ', email); 

            if (!name || !phone || !country || !city || !district || !ward || !address) {
                return res.status(400).json({ message: 'Mọi trường đều phải được nhập' });
            }

            const updatedAddress = await addressModel.updateAddress({ id_address, email }, { name, phone, country, city, district, ward, address });

            if (!updatedAddress) {
                return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
            }

            res.status(200).json({
                message: 'Địa chỉ được cập nhật thành công',
                updatedAddress: updatedAddress
            });
        } catch (error) {
            console.error('Lỗi khi cập nhật địa chỉ: ', error);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình cập nhật địa chỉ' });
        }
    }

    // [DELETE]: account/delete-address
    async deleteAddress(req, res) {
        try {
            // Xử lý bên front-end gửi lên với một trường ẩn 
            const { id_address } = req.body;
            // console.log('ID ADDRESS: ', id_address);
            const email = req.email;
            // console.log('EMAIL: ', email); 

            if (!id_address || !email) {
                return res.status(400).json({ message: 'Mọi trường đều phải được nhập' });
            }

            const deletedAddress = await addressModel.deleteAddress(id_address, email);
            // console.log('DELETED ADDRESS: ', deletedAddress);

            if (!deletedAddress) {
                return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
            }

            res.status(200).json({
                message: 'Địa chỉ được xóa thành công',
            });
        } catch (error) {
            console.error('Lỗi trong quá trình xóa địa chỉ', error);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình xóa địa chỉ' });
        }
    }

    // [PUT]: account/password
    async changePassword(req, res) {
        try {
            const { password, newPassword, newPasswordAgain } = req.body;
            console.log('REQ BODY CHANGE PASSWORD: ', req.body);
            const email = req.email;
            console.log('EMAIL: ', email);

            if (!password || !newPassword || !newPasswordAgain) {
                return res.status(400).json({ message: 'Mọi trường đều phải được nhập' });
            }

            if (newPassword !== newPasswordAgain) {
                return res.status(400).json({ message: "Mật khẩu không khớp" });
            }

            const user = await userModel.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({
                    message: "Không tìm thấy người dùng"
                });
            }
            const match = await bcrypt.compare(password, user.passwordorgoogleid);
            if (!match) {
                return res.status(401).json({
                    message: "Mật khẩu cũ không đúng"
                });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const newPassUser = await userModel.changePassword(hashedPassword, email);

            res.status(200).json({
                message: 'Mật khẩu được cập nhật thành công',
                newPassUser: newPassUser
            });
        } catch (error) {
            console.error('Lỗi trong quá trình cập nhật mật khẩu: ', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình cập nhật mật khẩu' });
        }
    }

    // [GET]: account/my-order
    async getMyOrder(req, res) {
        try {
            const email = req.email;
            const { page = 1, per_page = 12 } = req.query;
            const pageNum = parseInt(page, 10);
            const perPageNum = parseInt(per_page, 10);

            const allOrders = await orderModel.getAllOrdersByEmail(email, pageNum, perPageNum);

            const totalOrders = await orderModel.getTotalOrdersByEmail(email);
            const totalPages = Math.ceil(totalOrders / perPageNum);
            // console.log('ALL ORDERS: ', allOrders);
            res.status(200).json({
                message: 'Thông tin toàn bộ đơn hàng của bạn được lấy thành công',
                page: pageNum,
                total_page: totalPages,
                per_page: perPageNum,
                total: totalOrders,
                orders: allOrders
            });
        } catch (err) {
            console.error('Lỗi trong quá trình lấy thông tin toàn bộ đơn hàng của bạn: ', err);
            res.status(500).json({ message: 'Đã có lỗi trong quá trình lấy thông tin toàn bộ đơn hàng của bạn' });
        }

    }

    // [GET]: account/my-order/detail/:id_order
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

    // [PATCH]: account/my-order/cancel
    
}

module.exports = new AccountController();