const googleBooks = async (isbn) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
  if (!response.ok) {
    return null
  }

  const json = await response.json()
  if (json.totalItems === 0) {
    return null
  }

  const volumeInfo = json.items[0].volumeInfo
  return {
    isbn: Number(volumeInfo.industryIdentifiers[0].identifier),
    title: volumeInfo.title,
    authors: volumeInfo.authors,
    cover: volumeInfo.imageLinks.thumbnail
  }
}

export default {
  googleBooks
}