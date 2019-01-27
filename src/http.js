import axios from 'axios'
import { observable } from 'mobx'

const headers = token => {
  return {
    headers: {
      Authorization: token,
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
    const {
      response: { status },
    } = error

    switch (status) {
      case 401:
        localStorage.removeItem(`${APP_NAME}_TOKEN`)
        window.location = '/login'
        break
      // case 404:
      //   window.location = '/404'
    }
    return Promise.reject(error)
  }
)
export default class Http {
  @observable
  token = localStorage.getItem(`${APP_NAME}_TOKEN`)

  setToken = token => {
    localStorage.setItem(`${APP_NAME}_TOKEN`, token)
    this.token = token
  }
  get = (url, payload = {}) => {
    const config = Object.assign({ params: payload }, headers(`Bearer ${this.token}`))
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
        .then(res => resolve(responseParser(res)))
        .catch(err => reject(errorParser(err)))
    })
  }
  post = (url, payload) => {
    const config = Object.assign(headers(`Bearer ${this.token}`), {})
    return new Promise((resolve, reject) => {
      axios
        .post(url, payload, config)
        .then(res => resolve(responseParser(res)))
        .catch(err => reject(errorParser(err)))
    })
  }
  put = (url, payload) => {
    const config = Object.assign(headers(`Bearer ${this.token}`), {})
    return new Promise((resolve, reject) => {
      axios
        .put(url, payload, config)
        .then(res => resolve(responseParser(res)))
        .catch(err => reject(errorParser(err)))
    })
  }
  delete = url => {
    const config = Object.assign(headers(`Bearer ${this.token}`), {})
    return new Promise((resolve, reject) => {
      axios
        .delete(url, config)
        .then(res => resolve(responseParser(res)))
        .catch(err => reject(errorParser(err)))
    })
  }
}
