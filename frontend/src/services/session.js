import axios from 'axios'

export async function getDisplayName() {
  return axios
    .get('/api/session/displayName')
    .then(response => {
      if (response.status === 200) {
        return response.data
      } else {
        return null
      }
    })
}