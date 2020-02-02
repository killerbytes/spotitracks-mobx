import CommonService from './common';
import FirestoreService from './firestore';
import MyService from './myService';
import PlaylistService from './playlistService';

import Http from '../http';

const http = new Http();

export default {
  commonService: new CommonService(http),
  myService: new MyService(http),
  playlistService: new PlaylistService(http),
  firestoreService: new FirestoreService(),
};
