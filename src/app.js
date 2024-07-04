import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'

import bookRouter from './routes/book.route.js'

mongoose.connect(process.env.TEST_DB)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch ((err) => {
    console.error('Error connecting to DB', err)
  })

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/book', bookRouter)

export default app