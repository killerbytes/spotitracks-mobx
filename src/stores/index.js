import CommonStore from './commonStore';
import AuthStore from './authStore';
import PlaylistStore from './playlistStore';

import services from '../services';
import { createContext, useContext } from 'react';

export const StoreContext = createContext();

const stores = {
  commonStore: new CommonStore(services.commonService),
  authStore: new AuthStore(services.authService),
  playlistStore: new PlaylistStore(services.playlistService),
};

export const useStore = () => useContext(StoreContext);

export default stores;
