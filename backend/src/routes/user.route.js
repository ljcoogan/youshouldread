import express from 'express'
import * as controller from '../controllers/user.controller.js'

const router = express.Router()

router.get('/displayName', controller.getDisplayName)
router.get('/books', controller.getBooks)

export default router
