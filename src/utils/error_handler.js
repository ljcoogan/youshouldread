const error_handler = (err, req, res, next) => {
  if (err.message.startsWith('E11000')) {
    res.status(409).json({
      error: 'Content already exists in database'
    })
  } else {
    next(err)
  }
}

export default error_handler