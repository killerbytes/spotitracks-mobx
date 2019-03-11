import React from 'react'
import { inject } from 'mobx-react'

@inject('myStore')
export default class Callback extends React.Component {
  componentWillMount() {
    const { location, history, myStore } = this.props
    const params = JSON.parse(
      '{"' +
        decodeURI(location.hash)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    )

    myStore.token = params['#access_token']
    localStorage.setItem(`${APP_NAME}_TOKEN`, myStore.token)
    if (myStore.token) {
      history.push('/top-tracks')
    }
  }
  render() {
    return <div>Callback</div>
  }
}
