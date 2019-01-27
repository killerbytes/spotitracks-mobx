import React from 'react'
import { inject } from 'mobx-react'

@inject('userStore')
export default class Callback extends React.Component {
  componentWillMount() {
    const { location, history, userStore } = this.props
    const params = JSON.parse(
      '{"' +
        decodeURI(location.hash)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    )

    userStore.token = params['#access_token']
    localStorage.setItem(`${APP_NAME}_TOKEN`, userStore.token)
    if (userStore.token) {
      history.push('/playlists')
    }
  }
  render() {
    return <div>Callback</div>
  }
}
