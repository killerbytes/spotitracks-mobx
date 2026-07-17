import axios from 'axios';
import stores from '../stores';
const headers = () => {
  const token = JSON.parse(localStorage.getItem(`${process.env.REACT_APP_APP_NAME}_APP`)) || {};

  return {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  };
};

const responseParser = (res) => res.data;
const errorParser = (res) => res.response.data;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const setAuthHeader = (config, token) => {
  config.headers = config.headers || {};
  if (config.headers.set) {
    config.headers.set('Authorization', `Bearer ${token}`);
  } else {
    delete config.headers.Authorization;
    delete config.headers.authorization;
    config.headers['Authorization'] = `Bearer ${token}`;
  }
};

axios.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.message === 'Network Error') {
      return Promise.reject({ response: { data: { error } } });
    }

    if (!error.response) {
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    const message = data && data.error ? data.error.message : null;

    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthRequest =
      originalRequest.url && (originalRequest.url.includes('/refresh') || originalRequest.url.includes('/token'));

    if (status === 401 && !isAuthRequest) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            setAuthHeader(originalRequest, token);
            return axios.request(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        stores.authStore
          .refreshToken()
          .then((res) => {
            setAuthHeader(originalRequest, res.access_token);
            processQueue(null, res.access_token);
            resolve(axios.request(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default class Http {
  get = (url, payload = {}) => {
    const config = Object.assign({ params: payload }, headers());
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
        .then((res) => resolve(responseParser(res)))
        .catch((err) => reject(errorParser(err)));
    });
  };
  post = (url, payload) => {
    const config = Object.assign(headers(), {});
    return new Promise((resolve, reject) => {
      axios
        .post(url, payload, config)
        .then((res) => resolve(responseParser(res)))
        .catch((err) => reject(errorParser(err)));
    });
  };
  put = (url, payload) => {
    const config = Object.assign(headers(), {});
    return new Promise((resolve, reject) => {
      axios
        .put(url, payload, config)
        .then((res) => resolve(responseParser(res)))
        .catch((err) => reject(errorParser(err)));
    });
  };
  delete = (url) => {
    const config = Object.assign(headers(), {});
    return new Promise((resolve, reject) => {
      axios
        .delete(url, config)
        .then((res) => resolve(responseParser(res)))
        .catch((err) => reject(errorParser(err)));
    });
  };
}
