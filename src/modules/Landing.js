import React from 'react'

export default class Landing extends React.Component {
  generateLink() {
    const redirect_uri = `${window.location.origin}/callback`

    return `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${redirect_uri}&scope=${SCOPE}`
  }

  render() {
    return (
      <div>
        <img src="/images/logo.svg" />
        <a href={this.generateLink()} className="btn-spotify">
          <i className="fab fa-spotify" /> Connect with Spotify
        </a>
      </div>
    )
  }
}
