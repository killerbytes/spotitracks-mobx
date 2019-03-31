import React from 'react'
import { inject } from 'mobx-react'
import { parse } from 'query-string'
import Loading from 'components/Loading'

@inject('myStore')
export default class Callback extends React.Component {
  componentWillMount() {
    const { location, history, myStore } = this.props
    const { code } = parse(location.search)

    myStore.login(code).then(res => {
      if (res.data.error === 'invalid_grant') {
        history.push('/')
      } else if (res.data.access_token) {
        const redir = sessionStorage.getItem('SPOTITRACKS_REDIR')
        myStore.setToken(res.data)
        if (redir) {
          history.push(redir)
        } else {
          history.push('/top-tracks')
        }
      }
    })
  }
  render() {
    return <Loading />
  }
}
