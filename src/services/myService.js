export default class myService {
  constructor(http) {
    this.http = http
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
