const pool = require('../../config/database');

class CartModel {
    constructor() {
        this.pool = pool;
    }

    // 1. Get all product in cart by ID Book
    async getBookByIDBook(email, id_book) {
        const result = await this.pool.query('SELECT * FROM cart WHERE email = $1 and id_book = $2',
            [email, id_book]
        );
        return result.rows[0];
    }
    
    // 2. Add product into cart 
    async addBookIntoCart(email, id_book, quantity) {
        const result = await this.pool.query(
            'INSERT INTO Cart (email, id_book, quantity) VALUES ($1, $2, $3)', [email, id_book, quantity]
        );
        return result.rows[0];
    }

    // 3. Update quantity 
    async updateQuantity(email, id_book, quantity){
        const result = await this.pool.query(
            'UPDATE cart SET quantity = quantity + $1 WHERE email = $2 AND id_book = $3', [quantity, email, id_book]
        );
        return result.rows[0];
    }
}

module.exports = new CartModel(); 