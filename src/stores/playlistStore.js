import { decorate, observable } from 'mobx';
import PromiseThrottle from 'promise-throttle';
import stores from 'stores';

class PlaylistStore {
  token = null;
  tracks = { items: [] };
  temp_tracks = { items: [] };
  playlist = { tracks: { items: [] }, images: [] };

  constructor(api) {
    this.api = api;
  }

  createPlaylistAddTracks = async (user_id, name, tracks) => {
    return new Promise((resolve) => {
      const results = [];
      const promiseThrottle = new PromiseThrottle({
        requestsPerSecond: 5, // up to 1 request per second
        promiseImplementation: Promise, // the Promise library you are using
      });

      const uris = tracks.map((track) => {
        return track.uri;
      });

      while (uris.length > 0) {
        results.push(uris.splice(0, 100));
      }

      this.createPlaylist(user_id, name, 'Generated by http://spotitracks.firebaseapp.com').then((playlist) => {
        let promises = [];
        results.forEach((items) => {
          promises.push(promiseThrottle.add(() => this.addTracksToPlaylist(playlist.id, items.splice(0, 100))));
        });
        Promise.all(promises).then(() => {
          resolve(playlist);
        });
      });
    });
  };

  createPlaylist = (user_id, name, description, isPublic) => {
    return this.api.createPlaylist(user_id, name, description, isPublic);
  };

  addTracksToPlaylist = (playlist_id, uris) => {
    return this.api.addTracksToPlaylist(playlist_id, uris);
  };

  deletePlaylist = (playlist_id) => {
    return this.api.deletePlaylist(playlist_id);
  };

  getPlaylist = async (playlist_id) => {
    try {
      this.playlist = await this.api.getPlaylist(playlist_id);
    } catch (err) {
      console.log(err);
    }
  };

  getPlaylistTracks = async (playlist_id, offset) => {
    this.tracks.items = [];

    this.getAllPlaylistTracks(playlist_id, offset).then((res) => {
      this.tracks.items = res;
    });
  };

  getAllPlaylistTracks = (playlist_id) => {
    return new Promise((resolve) => {
      let items = [];
      stores.commonStore.isLoading = true;
      const xx = (playlist_id, offset, items = []) => {
        this.api.getPlaylistTracks(playlist_id, offset).then((res) => {
          items = [...items, ...res.items];
          if (res.offset + res.limit < res.total) {
            xx(playlist_id, res.offset + res.limit, items);
          } else {
            resolve(items);
            stores.commonStore.isLoading = false;
          }
        });
      };
      xx(playlist_id, 0, items);
    });
  };

  getCharts() {
    return new Promise((resolve) => {
      stores.commonStore.isLoading = true;
      this.api.getCharts().then((res) => {
        stores.commonStore.isLoading = false;
        resolve(res);
      });
    });
  }
}

export default decorate(PlaylistStore, {
  token: observable,
  tracks: observable,
  temp_tracks: observable,
  playlist: observable,
});
