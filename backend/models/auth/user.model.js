const pool = require('../../config/database');

class UserModel {
    constructor() {
        this.pool = pool;
    }
    
    // CRUD
    // 1. Create User
    async createUser(email, name, phone, gender, birthDate, type, role, passwordorgoogleid) {
        const result = await this.pool.query(
            `INSERT INTO Users (Email, Name, Phone, Gender, Birth_Date, Type, Role, PasswordOrGoogleID) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
             RETURNING *`,
            [email, name, phone, gender, birthDate, type, role, passwordorgoogleid]
        );
        return result.rows[0]; 
    }

    // 2. Read User by email
    async getUserByEmail(email) {
        const result = await this.pool.query(
            'SELECT * FROM Users WHERE Email = $1',
            [email]
        );
        return result.rows[0]; 
    }

    // 3. Update User (bao gồm cập nhật refresh_token)
    async updateUser(id, { email, name, phone, gender, birthDate, type, role, passwordorgoogleid, refresh_token }) {
        const result = await this.pool.query(
            `UPDATE Users 
            SET Email = $1, Name = $2, Phone = $3, Gender = $4, Birth_Date = $5, Type = $6, Role = $7, PasswordOrGoogleID = $8, refresh_token = $9 
            WHERE ID_User = $10 
            RETURNING *`,
            [email, name, phone, gender, birthDate, type, role, passwordorgoogleid, refresh_token, id]
        );
        return result.rows[0]; 
    }

    // 4. Delete User
    async deleteUser(id) {
        const result = await this.pool.query(
            'DELETE FROM Users WHERE ID_User = $1 RETURNING *',
            [id]
        );
        return result.rows[0]; 
    }

    // 5. Get All Users
    async getAllUsers() {
        const result = await this.pool.query('SELECT * FROM Users');
        return result.rows; 
    }
}

module.exports = new UserModel(); 