import CommonStore from './commonStore'
import MyStore from './myStore'
import PlaylistStore from './playlistStore'

import services from '../services'

export default {
  commonStore: new CommonStore(services.commonService),
  myStore: new MyStore(services.myService),
  playlistStore: new PlaylistStore(services.playlistService),
}
