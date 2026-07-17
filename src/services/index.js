import CommonService from './common';
import AuthService from './authService';
import PlaylistService from './playlistService';

import Http from './http';

const http = new Http();

const services = {
  commonService: new CommonService(http),
  authService: new AuthService(http),
  playlistService: new PlaylistService(http),
};
export default services;
