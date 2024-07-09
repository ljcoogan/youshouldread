import mongoose from 'mongoose'

mongoose.SchemaTypes.String.set('maxLength', 64)
mongoose.SchemaTypes.String.set('required', true)
mongoose.SchemaTypes.String.set('trim', true)

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String
})

export default mongoose.model('User', userSchema)