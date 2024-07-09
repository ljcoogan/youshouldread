const getDb = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.PROD_DB
  } else if (process.env.NODE_ENV === 'development') {
    return process.env.DEV_DB
  } else if (process.env.NODE_ENV === 'test') {
    return process.env.TEST_DB
  } else {
    throw new Error('NODE_ENV environment variable not set')
  }
}

export default {
  getDb
}