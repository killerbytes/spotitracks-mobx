import axios from 'axios'
export default class playlistService {
  constructor(http) {
    this.http = http
  }

  addTracksToPlaylist(playlist_id, uris) {
    return this.http.post(`${API_URL}/playlists/${playlist_id}/tracks`, {
      uris,
    })
  }

  createPlaylist(user_id, name, description, isPublic = true) {
    return this.http.post(`${API_URL}/users/${user_id}/playlists`, {
      name,
      description,
      public: isPublic,
    })
  }

  deletePlaylist(playlist_id) {
    return this.http.delete(`${API_URL}/playlists/${playlist_id}/followers`)
  }

  getPlaylist(playlist_id) {
    return this.http.get(`${API_URL}/playlists/${playlist_id}`)
  }

  getPlaylistTracks(playlist_id, offset) {
    return this.http.get(`${API_URL}/playlists/${playlist_id}/tracks`, {
      offset,
    })
  }

  getCharts() {
    return axios.get(`${CHART_URL}/api/charts`)
  }
}
