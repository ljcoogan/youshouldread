import express from 'express'
import controller from '../controllers/book.controller.js'

const router = express.Router()

router.get('/', controller.getBooks)
router.post('/', controller.postBook)

export default router