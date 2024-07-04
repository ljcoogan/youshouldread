import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  isbn: {
    type: Number,
    unique: true,
    min: 1000000000000,
    max: 9999999999999,
    required: true
  },
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

export default mongoose.model('Book', bookSchema)