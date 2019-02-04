import stores from 'stores'
import { observable, toJS, action } from 'mobx'
import PromiseThrottle from 'promise-throttle'

export default class PlaylistStore {
  @observable token = null
  @observable tracks = { items: [] }
  @observable temp_tracks = { items: [] }
  @observable playlist = { tracks: { items: [] }, images: [] }

  constructor(api) {
    this.api = api
  }

  createPlaylistAddTracks = async (user_id, name, tracks) => {
    return new Promise((resolve, reject) => {
      const results = []
      const req = []
      const promiseThrottle = new PromiseThrottle({
        requestsPerSecond: 5, // up to 1 request per second
        promiseImplementation: Promise, // the Promise library you are using
      })

      const uris = tracks.map(track => {
        return track.uri
      })

      while (uris.length > 0) {
        results.push(uris.splice(0, 100))
      }

      this.createPlaylist(user_id, name).then(playlist => {
        let promises = []
        results.forEach(items => {
          promises.push(promiseThrottle.add(() => this.addTracksToPlaylist(playlist.id, items.splice(0, 100))))
        })
        Promise.all(promises).then(() => {
          resolve(playlist)
        })
      })
    })
  }

  createPlaylist = (user_id, name, description, isPublic) => {
    return this.api.createPlaylist(user_id, name, description, isPublic)
  }

  addTracksToPlaylist = (playlist_id, uris) => {
    return this.api.addTracksToPlaylist(playlist_id, uris)
  }

  deletePlaylist = playlist_id => {
    return this.api.deletePlaylist(playlist_id)
  }

  getPlaylist = async playlist_id => {
    try {
      this.playlist = await this.api.getPlaylist(playlist_id)
    } catch (err) {}
  }

  getPlaylistTracks = async (playlist_id, offset) => {
    // try {
    //   this.tracks = await this.api.getPlaylistTracks(playlist_id, offset)
    // } catch (err) {}
    this.tracks.items = []
    this.getAllPlaylistTracks(playlist_id, offset).then(res => {
      this.tracks.items = res
    })
  }

  getAllPlaylistTracks = playlist_id => {
    return new Promise((resolve, reject) => {
      let items = []
      const xx = (playlist_id, offset, items = []) => {
        this.api.getPlaylistTracks(playlist_id, offset).then(res => {
          items = [...items, ...res.items]
          if (res.offset + res.limit < res.total) {
            xx(playlist_id, res.offset + res.limit, items)
          } else {
            resolve(items)
          }
        })
      }
      xx(playlist_id, 0, items)
    })

    // return new Promise((resolve, reject) => {
    //   this.api.getPlaylistTracks(playlist_id, offset).then(res => {
    //     // this.tracks.items = [...this.tracks.items, ...res.items]
    //     // this.temp_tracks.items = [...this.temp_tracks.items, ...res.items]
    //     items = [...items, ...res.items]
    //     if (res.offset + res.limit < res.total) {
    //       this.getAllPlaylistTracks(playlist_id, res.offset + res.limit, items)
    //     } else {
    //       console.log('resolve', items)
    //       resolve(items)
    //     }
    //   })
    // })
  }

  getCharts() {
    return this.api.getCharts()
  }
}
