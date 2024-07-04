import { describe, beforeEach, test, after } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import mongoose from 'mongoose'

import Book from '../src/models/book.model.js'

import app from '../src/app.js'
const api = supertest(app)

const testBooks = [
  {
    isbn: 9780140449266,
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas'
  },
  {
    isbn: 9781405964067,
    title: 'East of Eden',
    author: 'John Steinbeck'
  },
  {
    isbn: 9781786891686,
    title: 'Life of Pi',
    author: 'Yann Martel'
  }
]

describe('/api/book', async () => {
  beforeEach(async () => {
    await Book.deleteMany()

    const newBooks = testBooks.map((book) => {
      const newBook = { ...book }
      newBook._id = newBook.isbn
      delete newBook.isbn
      return newBook
    })
    await Book.insertMany(newBooks)
  })

  test('get /', async () => {
    const response = await api
      .get('/api/book')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(response.body, testBooks)
  })

})

after (async () => {
  await Book.deleteMany()
  await mongoose.connection.close()
})