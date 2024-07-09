export default function (err, req, res, next) {
  if (err.name === 'MongoServerError') {
    if (err.message.startsWith('E11000 duplicate key error collection')) {
      res.status(409).json({
        error: 'Content already exists in database'
      })
    }
  } else if (err.name === 'ValidationError') {
    if (err.message.startsWith('Book validation failed')) {
      if (err.message.includes('isbn')) {
        res.status(400).json({
          error: 'Book isbn not provided'
        })
      } else if (err.message.includes('title')) {
        res.status(400).json({
          error: 'Book title not provided'
        })
      } else if (err.message.includes('authors')) {
        res.status(400).json({
          error: 'Book authors not provided'
        })
      }
    }
  }

  next(err)
}