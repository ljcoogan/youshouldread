import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  // _id will always be set to a book's ISBN-13
  _id: Number,
  title: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 64,
    required: true
  },
  author: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 64,
    required: true
  }
})

bookSchema.set('toJSON', {
  transform: (_document, json) => {
    json.isbn = json._id
    delete json._id
    delete json.__v
  }
})

export default mongoose.model('Book', bookSchema)