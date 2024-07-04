const error_handler = (err, req, res, next) => {
  if (err.name === 'MongoServerError') {
    if (err.message.startsWith('E11000 duplicate key error collection')) {
      res.status(409).json({
        error: 'Content already exists in database'
      })
    }
  } else if (err.name === 'MongooseError') {
    if (err.message === 'document must have an _id before saving') {
      if (req.originalUrl === '/api/book') {
        res.status(400).json({
          error: 'ISBN not provided'
        })
      }
    }
  } else if (err.name === 'ValidationError') {
    if (err.message.startsWith('Book')) {
      if (err.message === 'Book validation failed: title: Path `title` is required.') {
        res.status(400).json({
          error: 'Book title not provided'
        })
      } else if (err.message === 'Book validation failed: author: Path `author` is required.') {
        res.status(400).json({
          error: 'Book author not provided'
        })
      }
    }
  }

  next(err)
}

export default error_handler