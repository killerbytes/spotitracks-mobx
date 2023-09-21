import CommonStore from './commonStore';
import MyStore from './myStore';
import PlaylistStore from './playlistStore';

import services from '../services';
import { createContext, useContext } from 'react';

export const StoreContext = createContext();

const stores = {
  commonStore: new CommonStore(services.commonService),
  myStore: new MyStore(services.myService),
  playlistStore: new PlaylistStore(services.playlistService),
}


export const useStore = () => useContext(StoreContext);

export default stores;
