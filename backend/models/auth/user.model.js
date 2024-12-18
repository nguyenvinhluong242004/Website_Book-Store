const pool = require('../../config/database');

class UserModel {
    constructor() {
        this.pool = pool;
    }
    
    // CRUD
    // 1. Create User - REGISTER 
    async createUser(email, name, phone, role, passwordorgoogleid) {
        const result = await this.pool.query(
            `INSERT INTO users (email, name, phone, role, passwordorgoogleid) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
            [email, name, phone, role, passwordorgoogleid]
        );
        return result.rows[0]; 
    }

    // 2. Get user by Email - FIND CONFLICT
    async getUserByEmail(email) {
        const result = await this.pool.query(
            'SELECT * FROM Users WHERE Email = $1',
            [email]
        );
        return result.rows[0]; 
    }

    // 3. Update User - Cập nhật theo email (Vì nó như là độc nhất)
    async updateUser(email, { name, phone, gender, birthdate, type, role, passwordorgoogleid}) {
        const result = await this.pool.query(
            `UPDATE users 
            SET name = $1, phone = $2, gender = $3, birth_date = $4, type = $5, role = $6, passwordorgoogleid = $7
            WHERE email = $8
            RETURNING *`,
            [name, phone, gender, birthdate, type, role, passwordorgoogleid, email]
        );
        return result.rows[0]; 
    }

    // 4. Delete User
    async deleteUser(email) {
        const result = await this.pool.query(
            'DELETE FROM users WHERE email = $1 RETURNING *',
            [email]
        );
        return result.rows[0]; 
    }

    // 5. Get All Users
    async getAllUsers() {
        const result = await this.pool.query('SELECT * FROM users');
        return result.rows; 
    }

    // 6. Get User by Refreshtoken
    async getUserByRefreshToken(refreshToken) {
        const result = await this.pool.query(
            'SELECT * FROM users WHERE refresh_token = $1',
            [refreshToken]
        );
        return result.rows[0]; 
    }

    // 7. Update user - refreshtoken
    async updateRefreshToken(email, refreshToken) {
        const result = await this.pool.query(
            `UPDATE users 
            SET refresh_token = $1
            WHERE email = $2
            RETURNING *`,
            [refreshToken, email]
        );
        return result.rows[0]; 
    }
}

module.exports = new UserModel(); 