import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'

import passport from 'passport'
import session from 'express-session'
import passportConfig from './utils/passport.js'
passportConfig(passport)

import config from './utils/config.js'
import errorHandler from './utils/errorHandler.js'

import { ensureAuth, ensureGuest } from './middleware/auth.js'

import authRouter from './routes/auth.route.js'
import bookRouter from './routes/book.route.js'

const db = config.getDb()
mongoose.connect(db)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch ((err) => {
    console.error('Error connecting to DB', err)
  })

const app = express()

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(express.json())

app.use(session({
  secret: process.env.AUTH_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)
app.use('/api/book', bookRouter)

app.use(errorHandler)

export default app