import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  // _id will always be set to a book's ISBN-13
  _id: Number,
  title: String,
  author: String
})

export default mongoose.model('Book', bookSchema)