import express from 'express'
import * as controller from '../controllers/session.controller.js'

const router = express.Router()

router.get('/displayName', controller.getDisplayName)

export default router
