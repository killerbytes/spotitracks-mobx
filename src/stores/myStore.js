import stores from 'stores'
import { observable, toJS, action } from 'mobx'
import { SHORT_TERM, MEDIUM_TERM, LONG_TERM } from '../constants'

export default class MyStore {
  @observable token = null
  @observable playlists = { items: [] }
  @observable me = { images: [] }
  @observable topTracks = {}
  @observable search = []

  constructor(api) {
    this.api = api
    this.topTracks[SHORT_TERM] = { items: [] }
    this.topTracks[MEDIUM_TERM] = { items: [] }
    this.topTracks[LONG_TERM] = { items: [] }
  }
  removeToken = () => {
    this.api.removeToken()
  }

  getUser = async () => {
    try {
      this.me = await this.api.getUser()
    } catch (err) {}
  }

  getPlaylists = () => {
    this.playlists.items = []
    this.getAllPlaylists()
  }
  getAllPlaylists = offset => {
    stores.commonStore.isLoading = true
    this.api.getPlaylists(offset).then(res => {
      this.playlists.items = [...this.playlists.items, ...res.items]
      if (res.offset + res.limit < res.total) {
        this.getAllPlaylists(res.offset + res.limit)
      } else {
        stores.commonStore.isLoading = false
      }
    })
  }

  getTopTracks = async (time_range = MEDIUM_TERM) => {
    stores.commonStore.isLoading = true
    try {
      this.topTracks[time_range] = await this.api.getTopTracks(time_range)
      stores.commonStore.isLoading = false
    } catch (err) {}
  }
}
