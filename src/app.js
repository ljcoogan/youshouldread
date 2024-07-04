import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'

import bookRouter from './routes/book.route.js'

let db
if (process.env.NODE_ENV === 'production') {
  db = process.env.PROD_DB
} else if (process.env.NODE_ENV === 'development') {
  db = process.env.DEV_DB
} else if (process.env.NODE_ENV === 'test') {
  db = process.env.TEST_DB
} else {
  throw new Error('NODE_ENV environment variable not set')
}

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

app.use('/api/book', bookRouter)

export default app