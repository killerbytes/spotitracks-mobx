import CommonService from './common';
import MyService from './myService';
import PlaylistService from './playlistService';

import Http from '../http';

const http = new Http();

const services = {
  commonService: new CommonService(http),
  myService: new MyService(http),
  playlistService: new PlaylistService(http),
};
export default services;
