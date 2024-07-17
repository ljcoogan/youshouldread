import axios from 'axios'

export async function getBooks() {
  return axios.get('/api/user/books').then((response) => {
    return response.status === 200 ? response.data : null
  })
}

export async function postBook(book) {
  return axios.post('/api/user/books', book).then((response) => {
    return response.status === 201 ? response.data : null
  })
}

export async function getMetadata(isbn) {
  return axios
    .get(`/api/user/books/${isbn}`)
    .then((response) => {
      return response.status === 200 ? response.data : null
    }).catch (err => null)
}
