import { action, makeObservable, observable, runInAction } from 'mobx';
import { LONG_TERM, MEDIUM_TERM, SHORT_TERM } from 'definitions';
import stores from 'stores';

class MyStore {
  token = null;
  playlists = { items: [] };
  me = { images: [] };
  topTracks = {};
  search = [];

  constructor(api) {
    this.api = api;
    this.topTracks[SHORT_TERM] = { items: [] };
    this.topTracks[MEDIUM_TERM] = { items: [] };
    this.topTracks[LONG_TERM] = { items: [] };

    makeObservable(this, {
      topTracks: observable,
      me: observable,
      playlists: observable,
      getUser: action,
      getPlaylists: action,
    });
  }
  removeToken = () => {
    this.api.removeToken();
  };
  getToken = () => this.api.getToken();

  setToken = (token) => {
    this.api.setToken(token);
  };
  login = (code) => {
    return this.api.login(code);
  };
  refreshToken = () => {
    return new Promise((resolve, reject) => {
      this.api
        .refreshToken()
        .then((res) => {
          if (res.data.access_token) {
            this.setToken({ ...this.api.getToken(), ...res.data });
            resolve(res.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  getUser = async () => {
    try {
      const res = await this.api.getUser();
      runInAction(() => {
        this.me = res;
      });
    } catch (err) {
      console.log(err);
    }
  };

  getPlaylists = () => {
    this.playlists.items = [];
    this.getAllPlaylists();
  };
  getAllPlaylists = (offset) => {
    stores.commonStore.setLoading(true);
    this.api.getPlaylists(offset).then((res) => {
      runInAction(() => {
        this.playlists.items = [...this.playlists.items, ...res.items];
      });
      if (res.offset + res.limit < res.total) {
        this.getAllPlaylists(res.offset + res.limit);
      } else {
        stores.commonStore.setLoading(false);
      }
    });
  };
  getCurrentPlaying = () => {
    return this.api.getCurrentPlaying();
  };
  nextTrack = () => {
    return this.api.nextTrack();
  };

  getTopTracks = async (time_range = MEDIUM_TERM) => {
    stores.commonStore.setLoading(true);
    try {
      const res = await this.api.getTopTracks(time_range);
      runInAction(() => {
        this.topTracks[time_range] = res;
      });

      stores.commonStore.setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
}

export default MyStore;
