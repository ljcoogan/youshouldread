import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  isbn: {
    type: Number,
    required: true,
    unique: true,
    min: 1000000000000,
    max: 9999999999999
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  authors: {
    type: [
      {
        type: String,
        trim: true
      }
    ],
    required: true,
    validate: (v) => Array.isArray(v) && v.length > 0
  },
  cover: {
    type: String
  }
})

export default mongoose.model('Book', bookSchema)
