import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  // _id will always be set to a book's ISBN-13
  _id: Number,
  title: String,
  author: String
})

bookSchema.set('toJSON', {
  transform: (_document, json) => {
    json.isbn = json._id
    delete json._id
    delete json.__v
  }
})

export default mongoose.model('Book', bookSchema)