import axios from 'axios';
const APP_NAME = process.env.REACT_APP_APP_NAME;
const OAUTH_URL = process.env.REACT_APP_OAUTH_URL;
const API_URL = process.env.REACT_APP_API_URL;

export default class myService {
  constructor(http) {
    this.http = http;
  }

  removeToken = () => {
    localStorage.removeItem(`${APP_NAME}_APP`);
  };

  setToken = (token) => {
    localStorage.setItem(`${APP_NAME}_APP`, JSON.stringify(token));
  };
  getToken = () => {
    return JSON.parse(localStorage.getItem(`${APP_NAME}_APP`));
  };

  login = (code) => {
    const redirect_uri = `${window.location.origin}/callback`;

    return axios.get(`${OAUTH_URL}/token`, {
      params: {
        code,
        redirect_uri,
      },
    });
  };

  refreshToken = () => {
    const { refresh_token } = JSON.parse(localStorage.getItem(`${APP_NAME}_APP`));
    return axios.post(`${OAUTH_URL}/refresh`, {
      refresh_token,
    });
  };

  getUser() {
    return this.http.get(`${API_URL}/me`);
  }
}
