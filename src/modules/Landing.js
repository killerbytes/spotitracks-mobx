import logo from 'assets/logo.svg'
import React from 'react'
import styled from 'styled-components'
import video from 'assets/video.mp4'
import { inject } from 'mobx-react'

const Main = styled.div`
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
  .bg-video {
    position: fixed;
    min-width: 100%;
    min-height: 100%;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.5;
  }
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: relative;
    flex-direction: column;
    padding: 0 1rem;
    a {
      &.btn {
        display: inline-flex;
        align-items: center;
        font-size: 15px;
        padding: 0.5rem 1rem;
        box-shadow: 0 0 5px #000;
      }
      i {
        font-size: 1.5rem;
        margin-right: 0.5rem;
        margin-top: -2px;
      }
    }
    img {
      min-width: 240px;
      max-width: 400px;
      width: 80%;
      margin-bottom: 1rem;
    }
  }
`

@inject('myStore')
export default class Landing extends React.Component {
  componentWillMount() {
    const { history } = this.props
    const token = JSON.parse(localStorage.getItem(`${APP_NAME}_APP`))
    if (token && token.access_token) {
      history.push('/playlists')
    }
  }
  generateLink() {
    const redirect_uri = `${window.location.origin}/callback`
    // const redirect_uri = `http://localhost:5000/callback`

    return `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&scope=${SCOPE}&show_dialog=true`
  }

  render() {
    return (
      <Main>
        <div className="hero">
          <video muted={true} loop={true} autoPlay={true} className="bg-video">
            <source src={video} type="video/mp4" />
          </video>
          <img src={logo} />
          <a href={this.generateLink()} className="btn btn-primary">
            <i className="fab fa-spotify" /> Connect with Spotify
          </a>
        </div>
      </Main>
    )
  }
}
