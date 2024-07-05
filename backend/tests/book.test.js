import { describe, beforeEach, test, after } from 'node:test'
import assert, { deepStrictEqual } from 'node:assert'
import supertest from 'supertest'
import mongoose from 'mongoose'

import Book from '../src/models/book.model.js'

import app from '../src/app.js'
const api = supertest(app)

const testBooks = [
  {
    isbn: 9780140449266,
    title: 'The Count of Monte Cristo',
    authors: [
      'Alexandre Dumas'
    ]
  },
  {
    isbn: 9781405964067,
    title: 'East of Eden',
    authors: [
      'John Steinbeck'
    ]
  },
  {
    isbn: 9781786891686,
    title: 'Life of Pi',
    authors: [
      'Yann Martel'
    ]
  }
]

const testRequest = {
  isbn: 9780141186672,
  title: "The Man in the High Castle",
  authors: [
    "Philip K. Dick"
  ]
}

describe('/api/book', async () => {
  beforeEach(async () => {
    await Book.deleteMany()
    await Book.insertMany(testBooks)
  })

  describe ('/', async () => {
    test('GET', async () => {
      const response = await api
        .get('/api/book')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // delete mongoose identifiers so deepStrictEqual can pass
      response.body.map((book) => {
        delete book._id
        delete book.__v
      })
  
      assert.deepStrictEqual(response.body, testBooks)
    })
  
    test('POST', async () => {
      const response = await api
        .post('/api/book')
        .send(testRequest)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      assert.deepStrictEqual(response.body.isbn, testRequest.isbn)
      assert.deepStrictEqual(response.body.title, testRequest.title)
      assert.deepStrictEqual(response.body.author, testRequest.author)
  
      await Book.deleteOne({ isbn: testRequest.isbn })
    })
  
    test('POST fails when ISBN isn\'t unique', async () => {
      const request = testBooks[0]
  
      const response = await api
        .post('/api/book')
        .send(request)
        .expect(409)
        .expect('Content-Type', /application\/json/)
  
      assert.deepStrictEqual(response.body, {
        error: 'Content already exists in database'
      })
    })
  
    test('POST fails when ISBN isn\'t provided', async () => {
      const request = { ...testRequest }
      delete request.isbn
  
      const response = await api
        .post('/api/book')
        .send(request)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      assert.deepStrictEqual(response.body, {
        error: 'Book isbn not provided'
      })
    })
  
    test('POST fails when title isn\'t provided', async () => {
      const request = { ...testRequest }
      delete request.title
  
      const response = await api
        .post('/api/book')
        .send(request)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      assert.deepStrictEqual(response.body, {
        error: 'Book title not provided'
      })
    })
  
    test('POST fails when authors aren\'t provided', async () => {
      const request = { ...testRequest }
      delete request.authors
  
      const response = await api
        .post('/api/book')
        .send(request)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      assert.deepStrictEqual(response.body, {
        error: 'Book authors not provided'
      })
    })
  
    test('POST trims extraneous whitespace', async () => {
      const request = { ...testRequest }
      request.title = request.title.concat('      ')
      request.authors[0] = '     '.concat(request.authors[0])

      const response = await api
        .post('/api/book')
        .send(request)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      request.title = request.title.trim()
      request.authors[0] = request.authors[0].trim()
      
      assert.deepStrictEqual(response.body.title, request.title)
      assert.deepStrictEqual(response.body.authors[0], request.authors[0])
  
      await Book.deleteOne({ isbn: request.isbn })
    })
  })

  describe('/isbn/', async () => {
    test('GET', async () => {
      const response = await api
        .get('/api/book/isbn/9780140449266')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      assert.deepStrictEqual(response.body.isbn, testBooks[0].isbn)
      assert.deepStrictEqual(response.body.title, testBooks[0].title)
      assert.deepStrictEqual(response.body.authors[0], testBooks[0].authors[0])
    })

    test('GET fails when ISBN provided is not in database', async () => {
      const response = await api
        .get('/api/book/isbn/9780261103283')
        .expect(404)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(response.body, {
        error: 'Book not in database'
      })
    })

    test('POST', async () => {
      const response = await api
        .post(`/api/book/isbn/${testRequest.isbn}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(response.body.isbn, testRequest.isbn)
      assert.deepStrictEqual(response.body.title, testRequest.title)
      assert.deepStrictEqual(response.body.authors[0], testRequest.authors[0])

      await Book.deleteOne({ isbn: testRequest.isbn })
    })
  })
})

after (async () => {
  await Book.deleteMany()
  await mongoose.connection.close()
})