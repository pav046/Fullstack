const Router = require('express')
const router = new Router()
const bookController = require('../controllers/book_controller')

router.post('/book', bookController.createBook)
router.get('/book', bookController.getBooks)
router.get('/book/:id', bookController.getOneBook)
router.put('/book', bookController.updateBook)
router.delete('/book/:id', bookController.deleteBook)


module.exports = router