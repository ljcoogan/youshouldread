import mongoose from 'mongoose'

mongoose.SchemaTypes.String.set('maxLength', 64)
mongoose.SchemaTypes.String.set('required', true)
mongoose.SchemaTypes.String.set('trim', true)

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  username: {
    type: String,
    unique: true
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'books',
    required: true,
    validate: (v) => Array.isArray(v)
  }
})

export default mongoose.model('User', userSchema)
