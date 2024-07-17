import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import mongoStore from 'connect-mongo'

import dbConfig from './config/db.config.js'
import passportConfig from './config/passport.config.js'

import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'

import errorHandler from './utils/errorHandler.js'

const db = dbConfig()
mongoose
  .connect(db)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch((err) => {
    console.error('Error connecting to DB', err)
  })

const app = express()
app.use(express.static('dist'))

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(express.json())

app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      client: mongoose.connection.getClient(),
      collectionName: 'sessions'
    })
  })
)

passportConfig(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use(errorHandler)

export default app
