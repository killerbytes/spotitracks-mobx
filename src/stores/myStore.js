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
    this.api.getPlaylists(offset).then(res => {
      this.playlists.items = [...this.playlists.items, ...res.items]
      if (res.offset + res.limit < res.total) {
        this.getAllPlaylists(res.offset + res.limit)
      }
    })
  }

  getTopTracks = async (time_range = MEDIUM_TERM) => {
    try {
      this.topTracks[time_range] = await this.api.getTopTracks(time_range)
    } catch (err) {}
  }
  find = async () => {
    try {
      this.search = await this.api.find()
    } catch (err) {}
  }
}
