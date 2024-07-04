const googleBooks = async (isbn) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
  const json = await response.json()

  if (json.totalItems === 0) {
    return null
  }

  const volumeInfo = json.items[0].volumeInfo
  return {
    isbn: Number(volumeInfo.industryIdentifiers[0].identifier),
    title: volumeInfo.title,
    author: volumeInfo.authors[0]
  }
}

export default {
  googleBooks
}