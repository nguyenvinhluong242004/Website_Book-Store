const bcrypt = require('bcrypt');

const userModel = require('../../models/user.model');
const addressModel = require('../../models/user/address.model');


class AccountController {
    // [GET]: /account/profile
    async getProfile(req, res) {
        try {
            const email = req.email;
            const userProfile = await userModel.getProfileByEmail(email);
            if (!userProfile) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.status(200).json({
                message: 'Profile fetched successfully.',
                user: userProfile
            });
        } catch (err) {
            console.error('Error fetching profile:', err);
            res.status(500).json({ message: 'An error occurred while fetching profile.' });
        }
    }

    // [POST]: /account/profile
    async updateProfile(req, res) {
        try {
            const { name, phone, gender, birthday } = req.body;
            // console.log('REQ BODY: ', req.body);
            const email = req.email;
            // console.log('EMAIL: ', email); 

            if (!name || !phone || !gender || !birthday) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const updatedUser = await userModel.updateUser(email, { name, phone, gender, birthday });

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }

            res.status(200).json({
                message: 'Profile updated successfully.',
                updatedUser: updatedUser
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ message: 'An error occurred while updating profile.' });
        }
    }

    // [GET]: /account/address
    async getAllAddress(req, res) {
        try {
            const email = req.email;
            const allAddress = await addressModel.getAllAddress(email);
            if (allAddress.length === 0) {
                return res.status(404).json({ message: 'No addresses found.' });
            }

            res.status(200).json({
                message: 'Addresses fetched successfully.',
                allAddress: allAddress
            });
        } catch (error) {
            console.error('Error getting all addresses:', error);
            res.status(500).json({ message: 'An error occurred while getting all addresses.' });
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
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const newAddress = await addressModel.createAddress(name, phone, country, city, district, ward, address, email);

            res.status(200).json({
                message: 'Address created successfully.',
                address: newAddress
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ message: 'An error occurred while updating profile.' });
        }
    }

    // [PUT]: account/update-address
    async updateAddress(req, res) {
        try {
            const { id_address } = req.params;
            console.log('ID ADDRESS: ', id_address);
            const { name, phone, country, city, district, ward, address } = req.body;
            // console.log('REQ BODY UPDATE ADDRESS: ', req.body);
            const email = req.email;
            // console.log('EMAIL: ', email); 

            if (!name || !phone || !country || !city || !district || !ward || !address) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const updatedAddress = await addressModel.updateAddress({ id_address, email }, { name, phone, country, city, district, ward, address });

            if (!updatedAddress) {
                return res.status(404).json({ message: 'Address not found.' });
            }

            res.status(200).json({
                message: 'Address updated successfully.',
                updatedAddress: updatedAddress
            });
        } catch (error) {
            console.error('Error updating address:', error);
            res.status(500).json({ message: 'An error occurred while updating address.' });
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
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const deletedAddress = await addressModel.deleteAddress(id_address, email);
            // console.log('DELETED ADDRESS: ', deletedAddress);

            if (!deletedAddress) {
                return res.status(404).json({ message: 'Address not found.' });
            }

            res.status(200).json({
                message: 'Address deleted successfully.',
            });
        } catch (error) {
            console.error('Error updating address:', error);
            res.status(500).json({ message: 'An error occurred while deleting address.' });
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
                return res.status(400).json({ message: 'All fields are required.' });
            }

            if (newPassword !== newPasswordAgain) {
                return res.status(400).json({ error: "Passwords do not match" });
            }

            const user = await userModel.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({
                    error: "User not found"
                });
            }
            const match = await bcrypt.compare(password, user.passwordorgoogleid);
            if (!match) {
                return res.status(401).json({
                    error: "Invalid password"
                });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const newPassUser = await userModel.changePassword(hashedPassword, email);

            res.status(200).json({
                message: 'Password updated successfully.',
                newPassUser: newPassUser
            });
        } catch (error) {
            console.error('Error updating password:', error);
            res.status(500).json({ message: 'An error occurred while updating password.' });
        }
    }
}

module.exports = new AccountController();