import axios from 'axios'

export async function getBooks() {
  return axios
    .get('/api/user/books')
    .then(response => {
      return response.status === 200
        ? response.data
        : null
    })
}