import { action, observable, toJS } from 'mobx'
import { LONG_TERM, MEDIUM_TERM, SHORT_TERM } from '../constants'
import stores from 'stores'

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
  setToken = token => {
    this.api.setToken(token)
  }
  login = code => {
    return this.api.login(code)
  }
  refreshToken = () => {
    return new Promise((resolve, reject) => {
      this.api
        .refreshToken()
        .then(res => {
          if (res.data.access_token) {
            this.setToken({ ...this.api.getToken(), ...res.data })
            resolve(res.data)
          }
        })
        .catch(err => reject(err))
    })
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
