const db = require('../db')

class AuthorModel {
    static async createAuthor(name, birthdate, country) {
        const author = await db.query(
            'INSERT INTO authors (name, birthdate, country) values ($1, $2, $3) RETURNING *', [name, birthdate, country]
        )
        return author[0]
    }

    static async getAuthors(limit, offset) {
        const author = await db.query('SELECT * FROM authors ORDER BY id LIMIT $1 OFFSET $2', [limit, offset])
        return author
    }

    static async getOneAuthor(id) {
        const author = await db.query('SELECT * FROM authors WHERE id = $1', [id])
        return author[0]
    }

    static async updateAuthor(id, name, birthdate, country) {
        const author = await db.query(
            'UPDATE authors SET name = $1, birthdate = $2, country = $3 WHERE id = $4 RETURNING *',
            [name, birthdate, country, id]
        )
        return author[0]
    }

    static async deleteAuthor(id) {
        const author = await db.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id])
        return author[0]
    }
}

module.exports = AuthorModel