const pool = require('../sql')

class Professor {
    static async getAll() {
        const result = await pool.query('SELECT * FROM professor')
        return result.rows
    }

    static async getById(id) {
        const result = await pool.query('SELECT * FROM professor WHERE id = $1', [id])
        return result.rows[0]
    }

    static async insert({ nome, email }) {
        const result = await pool.query(
            'INSERT INTO professor (nome, email) VALUES ($1, $2) RETURNING *',
            [nome, email]
        )
        return result.rows[0]
    }

    static async update(id, { nome, email }) {
        const result = await pool.query(
            'UPDATE professor SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
            [nome, email, id]
        )
        return result.rows[0]
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM professor WHERE id = $1 RETURNING *', [id])
        return result.rows[0]
    }
}

module.exports = Professor