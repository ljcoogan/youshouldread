import mongoose from 'mongoose'

mongoose.SchemaTypes.String.set('trim', true)
mongoose.SchemaTypes.String.set('maxLength', 64)

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
    required: true
  },
  authors: {
    type: [String],
    validate: v => Array.isArray(v) && v.length > 0
  },
  cover: {
    type: String,
    maxLength: 256
  }
})

export default mongoose.model('Book', bookSchema)