import express from 'express'
import controller from '../controllers/book.controller.js'

const router = express.Router()

router.get('/', controller.getBooks)
router.post('/', controller.postBook)

router.get('/isbn/:isbn', controller.getBookByIsbn)
router.post('/isbn/:isbn', controller.postBookByIsbn)

export default router