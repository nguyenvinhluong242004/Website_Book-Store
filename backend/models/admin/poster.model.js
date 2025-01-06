const pool = require('../../config/database');

class PosterModel {
    constructor() {
        this.pool = pool;
    }

    // CRUD
    // 1. Get all poster
    async getAllPosters() {
        const result = await this.pool.query("SELECT * FROM poster");
        return result.rows;
    }

    // 2. Add poster
    async add(name, image_link, product_link){
        const result = await this.pool.query(
            `INSERT INTO poster (name, image_link, product_link) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [name, image_link, product_link]
        );
        return result.rows[0];
    }
}

module.exports = new PosterModel(); 