import CommonStore from './commonStore'
import MyStore from './myStore'
import PlaylistStore from './playlistStore'
import UserStore from './userStore'

import services from '../services'

export default {
  commonStore: new CommonStore(services.commonService),
  myStore: new MyStore(services.myService),
  playlistStore: new PlaylistStore(services.playlistService),
  userStore: new UserStore(services.userService),
}
