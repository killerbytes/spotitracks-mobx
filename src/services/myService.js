import axios from 'axios'

export default class myService {
  constructor(http) {
    this.http = http
  }

  removeToken = () => {
    localStorage.removeItem(`${APP_NAME}_APP`)
  }

  setToken = token => {
    localStorage.setItem(`${APP_NAME}_APP`, JSON.stringify(token))
  }
  getToken = () => {
    return JSON.parse(localStorage.getItem(`${APP_NAME}_APP`))
  }

  login = code => {
    const redirect_uri = `${window.location.origin}/callback`

    return axios.get(`${OAUTH_URL}/token`, {
      params: {
        code,
        redirect_uri,
      },
    })
  }

  refreshToken = () => {
    const { refresh_token } = JSON.parse(localStorage.getItem(`${APP_NAME}_APP`))
    return axios.post(`${OAUTH_URL}/refresh`, {
      refresh_token,
    })
  }

  getUser() {
    return this.http.get(`${API_URL}/me`)
  }

  getPlaylists(offset, limit = 50) {
    return this.http.get(`${API_URL}/me/playlists`, {
      limit,
      offset,
    })
  }

  getTopTracks(time_range, offset) {
    return this.http.get(`${API_URL}/me/top/tracks`, {
      limit: 50,
      time_range,
      offset,
    })
  }

  find() {
    return this.http.get(`${API_URL}/search`, {
      type: 'playlist',
      q: 'name:Hard',
    })
  }
}
