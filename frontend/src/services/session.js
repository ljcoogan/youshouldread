import axios from 'axios'
import Cookies from 'js-cookie'

export async function getDisplayName() {
  return axios
    .get('/api/session/displayName')
    .then(response => {
      return response.status === 200
        ? response.data
        : null
    })
}

export async function signOut() {
  Cookies.remove('displayName')
  window.location.href="/api/auth/google/logout"
}