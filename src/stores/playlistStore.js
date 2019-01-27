import stores from 'stores'
import { observable, toJS, action } from 'mobx'

export default class PlaylistStore {
  @observable token = null
  @observable tracks = { items: [] }
  @observable playlist = { tracks: { items: [] } }

  constructor(api) {
    this.api = api
  }

  createPlaylistAddTracks = async (user_id, name, tracks) => {
    return new Promise((resolve, reject) => {
      this.createPlaylist(user_id, name).then(res => {
        this.addTracksToPlaylist(res.id, tracks).then(() => {
          resolve(res)
        })
      })
    })
  }

  createPlaylist = (user_id, name, description, isPublic) => {
    return this.api.createPlaylist(user_id, name, description, isPublic)
  }

  addTracksToPlaylist = (playlist_id, tracks) => {
    const uris = tracks.map(track => {
      return track.uri
    })

    return this.api.addTracksToPlaylist(playlist_id, uris)
  }

  deletePlaylist = playlist_id => {
    return this.api.deletePlaylist(playlist_id)
  }

  getPlaylist = async playlist_id => {
    try {
      this.playlist = await this.api.getPlaylist(playlist_id)
      console.log(toJS(this.playlist))
    } catch (err) {}
  }

  getPlaylistTracks = async (playlist_id, offset) => {
    // try {
    //   this.tracks = await this.api.getPlaylistTracks(playlist_id, offset)
    // } catch (err) {}
    this.tracks.items = []
    this.getAllPlaylistTracks(playlist_id, offset)
  }

  getAllPlaylistTracks = (playlist_id, offset) => {
    this.api.getPlaylistTracks(playlist_id, offset).then(res => {
      this.tracks.items = [...this.tracks.items, ...res.items]
      if (res.offset + res.limit < res.total) {
        this.getAllPlaylistTracks(playlist_id, res.offset + res.limit)
      }
    })
  }
}
