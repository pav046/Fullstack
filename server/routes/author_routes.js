const Router = require('express')
const router = new Router()
const authorController = require('../controllers/author_controller')

router.post('/author', authorController.createAuthor)
router.get('/author', authorController.getAuthors)
router.get('/author/:id', authorController.getOneAuthor)
router.put('/author', authorController.updateAuthor)
router.delete('/author/:id', authorController.deleteAuthor)


module.exports = router