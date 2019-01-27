export default class userService {
  constructor(http) {
    this.http = http
  }

  // getPlaylistTracks(owner_id, playlist_id, offset) {
  //   return this.http.get(`${API_URL}/users/${owner_id}/playlists/${playlist_id}/tracks`, {
  //     params: {
  //       offset,
  //     },
  //   })
  // }
}
