const pool = require('../../config/database');

class AddressModel {
    constructor() {
        this.pool = pool;
    }

    // CRUD
    // 1. Create Address 
    async createAddress(name, phone, country, city, district, ward, address, email) {
        const result = await this.pool.query(
            `INSERT INTO address_booking (name, phone, country, city, district, ward, address, email) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
             RETURNING *`,
            [name, phone, country, city, district, ward, address, email]
        );
        return result.rows[0];
    }

    // 2. Update address 
    async updateAddress({id_address, email}, { name, phone, country, city, district, ward, address }) {
        const result = await this.pool.query(
            `UPDATE address_booking
            SET name = $1, phone = $2, country = $3, city = $4, district = $5, ward = $6, address = $7
            WHERE id_address = $8 and email = $9
            RETURNING *`,
            [name, phone, country, city, district, ward, address, id_address, email]
        );
        return result.rows[0];
    }

    // 3. Delete Address
    async deleteAddress(id_address, email) {
        const result = await this.pool.query(
            'DELETE FROM address_booking WHERE id_address = $1 and email = $2 RETURNING *',
            [id_address, email]
        );
        // console.log('RESULT: ', result);
        return result.rows[0];
    }

    // 4. Get All Address
    async getAllAddress(email) {
        const result = await this.pool.query('SELECT * FROM address_booking WHERE email = $1',
            [email]
        );
        return result.rows;
    }
}

module.exports = new AddressModel(); 