import Book from '../models/book.model.js'

const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (err) {
    next(err)
  }
}

const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.isbn)
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

const postBook = async (req, res, next) => {
  try {
    const { isbn, title, author } = req.body

    const book = new Book({
      _id: isbn,
      title: title,
      author: author
    })
    
    const savedBook = await book.save()
    res.status(201).json(savedBook)
  } catch (err) {
    next(err)
  }
}

export default {
  getBooks,
  getBook,
  postBook
}