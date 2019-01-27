import stores from 'stores'
import { observable, toJS, action } from 'mobx'

export default class UserStore {
  @observable token = null
  @observable tracks = { items: [] }

  constructor(api) {
    this.api = api
  }

  // getPlaylistTracks = async (owner_id, playlist_id, offset) => {
  //   try {
  //     this.tracks = await this.api.getPlaylistTracks(owner_id, playlist_id, offset)
  //   } catch (err) {}
  // }

  // createPlaylistAddTracks = async (user_id, name, tracks) => {
  //   this.createPlaylist(user_id, name).then(res => {
  //     console.log(res)
  //   })
  // }

  // createPlaylist = (user_id, name, description, isPublic) => {
  //   return this.api.createPlaylist(user_id, name, description, isPublic)
  // }
}
