import { observable, toJS } from 'mobx'
import axios from 'axios'
import stores from './stores'
const headers = () => {
  const token = JSON.parse(localStorage.getItem(`${APP_NAME}_APP`)) || {}

  return {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }
}

const responseParser = res => res.data
const errorParser = res => res.response.data

axios.interceptors.response.use(
  function(config) {
    return config
  },
  function(error) {
    if (error.message === 'Network Error') {
      console.log(error.message)
      return false
    }
    const {
      response: {
        status,
        data: {
          error: { message },
        },
      },
    } = error
    switch (status) {
      case 401:
        switch (message) {
          case 'The access token expired':
            return stores.myStore.refreshToken().then(res => {
              error.config.headers['Authorization'] = `Bearer ${res.access_token}`
              return axios.request(error.config)
            })

            break
          default:
            sessionStorage.setItem('SPOTITRACKS_REDIR', window.location.pathname)
            window.location = '/login'
            break
        }

        break
      // case 404:
      //   window.location = '/404'
    }
    return Promise.reject(error)
  }
)

export default class Http {
  get = (url, payload = {}) => {
    const config = Object.assign({ params: payload }, headers())
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
        .then(res => resolve(responseParser(res)))
        .catch(err => reject(errorParser(err)))
    })
  }
  post = (url, payload) => {
    const config = Object.assign(headers(), {})
    return new Promise((resolve, reject) => {
      axios
        .post(url, payload, config)
        .then(res => resolve(responseParser(res)))
        .catch(err => reject(errorParser(err)))
    })
  }
  put = (url, payload) => {
    const config = Object.assign(headers(), {})
    return new Promise((resolve, reject) => {
      axios
        .put(url, payload, config)
        .then(res => resolve(responseParser(res)))
        .catch(err => reject(errorParser(err)))
    })
  }
  delete = url => {
    const config = Object.assign(headers(), {})
    return new Promise((resolve, reject) => {
      axios
        .delete(url, config)
        .then(res => resolve(responseParser(res)))
        .catch(err => reject(errorParser(err)))
    })
  }
}
