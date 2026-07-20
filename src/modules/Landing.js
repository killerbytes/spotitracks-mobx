import logo from 'assets/logo.svg';
import Button from 'styled/Button';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import video from 'assets/video.mp4';
import { useStore } from 'stores';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { authStore } = useStore();
  const navigate = useNavigate();

  const generateLink = () => {
    const redirect_uri = `${window.location.origin}/callback`;
    return `${process.env.REACT_APP_AUTHORIZE_URL}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&scope=${process.env.REACT_APP_SCOPE}&show_dialog=true`;
  };

  useEffect(() => {
    const token = authStore.getToken();
    if (token) {
      navigate('/top-tracks');
    }
  }, [authStore, navigate]);

  return (
    <Main>
      <div className="hero">
        <video muted={true} loop={true} autoPlay={true} className="bg-video">
          <source src={video} type="video/mp4" />
        </video>
        <img alt="logo" src={logo} />
        <Button as="a" href={generateLink()} className="btn-primary">
          <i className="fab fa-spotify" /> Connect with Spotify
        </Button>
      </div>
    </Main>
  );
};

export default observer(Landing);

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
    padding: 0 ${(props) => props.theme.spacing.md};
    a {
      &.btn {
        display: inline-flex;
        align-items: center;
        padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
        box-shadow: 0 0 5px ${(props) => props.theme.background};
      }
      i {
        font-size: 1.5rem;
        margin-right: ${(props) => props.theme.spacing.sm};
        margin-top: -2px;
      }
    }
    img {
      min-width: 240px;
      max-width: 400px;
      width: 80%;
      margin-bottom: ${(props) => props.theme.spacing.md};
    }
  }
`;
