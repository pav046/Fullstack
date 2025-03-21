const db = require('../db')
const AuthorModel = require('../models/author_model')

class AuthorController {
    async createAuthor(req, res) {
        try {
            const { name, birthdate, country } = req.body
            const author = await AuthorModel.createAuthor( name, birthdate, country)
            res.json(author)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async getAuthors(req, res) {
        try {
            const limit = parseInt(req.query.limit, 10) || 10;
            const offset = parseInt(req.query.offset, 10) || 0;
            
            const authors = await AuthorModel.getAuthors(limit, offset)
            
            res.json(authors)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async getOneAuthor(req, res) {
        try {
            const id = req.params.id
            const author = await AuthorModel.getOneAuthor(id)
            if (!author) {
                return res.status(404).json({ message: 'Author not found' })
            }
            res.json(author)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async updateAuthor(req, res) {
        try {
            const { id, name, birthdate, country } = req.body
            const author = await AuthorModel.updateAuthor(id, name, birthdate, country)
            if (!author) {
                return res.status(404).json({ message: 'Author not found' })
            }
            res.json(author)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async deleteAuthor(req, res){
        try {
            const id = req.params.id
            const author = await AuthorModel.deleteAuthor(id)
            if (!author) {
                return res.status(404).json({ message: 'Author not found' })
            }
            res.json(author)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
module.exports = new AuthorController()