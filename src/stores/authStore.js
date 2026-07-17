import { action, makeObservable, observable, runInAction } from 'mobx';

class AuthStore {
  token = null;
  me = { images: [] };

  constructor(api) {
    this.api = api;

    makeObservable(this, {
      me: observable,
      getUser: action,
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
          if (res.data && res.data.access_token) {
            this.setToken({ ...this.api.getToken(), ...res.data });
            resolve(res.data);
          } else {
            reject(new Error('Invalid token refresh response'));
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
}

export default AuthStore;
