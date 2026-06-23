const pool = require('../sql')

class Curso {
    static async getAll() {
        const result = await pool.query(`
            SELECT
                cursos.*,
                professor.nome AS coordenador
            FROM cursos
            LEFT JOIN professor ON professor.id = cursos.id_coordenador
            ORDER BY cursos.id
        `)
        return result.rows
    }

    static async getById(id) {
        const result = await pool.query(
            `
            SELECT
                cursos.*,
                professor.nome AS coordenador
            FROM cursos
            LEFT JOIN professor ON professor.id = cursos.id_coordenador
            WHERE cursos.id = $1
            `,
            [id]
        )
        return result.rows[0]
    }

    static async insert({ nome, descricao, sigla, id_coordenador }) {
        const result = await pool.query(
            'INSERT INTO cursos (nome, descricao, sigla, id_coordenador) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, descricao, sigla, id_coordenador]
        )
        return result.rows[0]
    }

    static async update(id, { nome, descricao, sigla, id_coordenador }) {
        const result = await pool.query(
            'UPDATE cursos SET nome = $1, descricao = $2, sigla = $3, id_coordenador = $4 WHERE id = $5 RETURNING *',
            [nome, descricao, sigla, id_coordenador, id]
        )
        return result.rows[0]
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM cursos WHERE id = $1 RETURNING *', [id])
        return result.rows[0]
    }
}

module.exports = Curso