const db = require('../db')
const BookModel = require('../models/book_model')

class BookController {
    async createBook(req, res) {
        try {
            const { title, author_id, published_date, price, stock } = req.body
            const book = await BookModel.createBook(title, author_id, published_date, price, stock)
            res.json(book)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async getBooks(req, res) {
        try {
            const books = await BookModel.getBooks()
            res.json(books)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async getOneBook(req, res) {
        try {
            const id = req.params.id
            const book = await BookModel.getOneBook(id)
            if (!book) {
                return res.status(404).json({ message: 'Book not found' })
            }
            res.json(book)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async updateBook(req, res) {
        try {
            const { id, title, author_id, published_date, price, stock } = req.body
            const book = await BookModel.updateBook(id, title, author_id, published_date, price, stock)
            if (!book) {
                return res.status(404).json({ message: 'Book not found' })
            }
            res.json(book)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async deleteBook(req, res){
        try {
            const id = req.params.id
            const book = await BookModel.deleteBook(id)
            if (!book) {
                return res.status(404).json({ message: 'Book not found' })
            }
            res.json(book)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
module.exports = new BookController()