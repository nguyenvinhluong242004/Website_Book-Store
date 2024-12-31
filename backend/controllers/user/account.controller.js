const bcrypt = require('bcrypt');

const userModel = require('../../models/user.model');
const addressModel = require('../../models/user/address.model');


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

    // [GET]: /account/address
    async getAllAddress(req, res) {
        try {
            const email = req.email;
            const allAddress = await addressModel.getAllAddress(email);
            if (allAddress.length === 0) {
                return res.status(404).json({ message: 'Chưa có địa chỉ' });
            }

            res.status(200).json({
                message: 'Địa chỉ được lấy thành công',
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
}

module.exports = new AccountController();