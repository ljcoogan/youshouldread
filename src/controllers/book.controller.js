import Book from '../models/book.model.js'

const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (err) {
    next(err)
  }
}

export default {
  getBooks
}