import Book from '../models/book.model.js'
import { googleBooks } from '../utils/getMetadata.js'

export async function getBooks(req, res, next) {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (err) {
    next(err)
  }
}

export async function postBook(req, res, next) {
  try {
    const { isbn, title, authors } = req.body

    const book = new Book({
      isbn,
      title,
      authors
    })

    const savedBook = await book.save()
    res.status(201).json(savedBook)
  } catch (err) {
    next(err)
  }
}

export async function getBookByIsbn(req, res, next) {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn })
    if (!book) {
      res.status(404).json({
        error: 'Book not in database'
      })
    }
    res.json(book)
  } catch (err) {
    next(err)
  }
}

export async function postBookByIsbn(req, res, next) {
  try {
    const data = await googleBooks(req.params.isbn)
    if (!data) {
      res.status(404).json({
        error: 'Metadata could not be located for provided ISBN'
      })
    }
    const book = new Book(data)
    const savedBook = await book.save()
    res.status(201).json(savedBook)
  } catch (err) {
    next(err)
  }
}

export async function getMetadataFromIsbn(req, res, next) {
  try {
    const data = await googleBooks(req.params.isbn)
    if (!data) {
      res.status(404).json({
        error: 'Metadata could not be located for provided ISBN'
      })
    } else {
      res.json(data)
    }
  } catch (err) {
    next(err)
  }
}
