const db = require('../db')

class BookModel {
    static async createBook(title, author_id, published_date, price, stock) {
        const book = await db.query(
            'INSERT INTO books (title, author_id, published_date, price, stock) values ($1, $2, $3, $4, $5) RETURNING *',
            [title, author_id, published_date, price, stock]
        )
        return book[0]
    }

    static async getBooks() {
        return await db.query('SELECT * FROM books')
    }

    static async getOneBook(id) {
        const book = await db.query('SELECT * FROM books WHERE id = $1', [id])
        return book[0]
    }

    static async updateBook(id, title, author_id, published_date, price, stock) {
        const book = await db.query(
            'UPDATE books SET title=$1, author_id=$2, published_date=$3, price=$4, stock=$5 WHERE id=$6 RETURNING *',
            [title, author_id, published_date, price, stock, id]
        )
        return book[0]
    }

    static async deleteBook(id) {
        const book = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id])
        return book[0]
    }
}

module.exports = BookModel