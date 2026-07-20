import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'stores';
import styled from 'styled-components';

const UserBar = () => {
  const { authStore } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.removeToken();

    navigate('/');
  };

  const Avatar = () => {
    let img = authStore.me.images.length > 0 ? authStore.me.images[0] : undefined;
    if (img) {
      return <img src={img.url} alt="" />;
    }
    return <img src={`https://ui-avatars.com/api/?name=${authStore.me.display_name}`} alt="" />;
  };

  return (
    <Container className="user-bar">
      <div className="user">
        <a className="social-fb" href="https://www.facebook.com/Spotitracks-189230884967129/">
          <i className="fab fa-facebook" />
        </a>
        <Avatar />
        <div>
          {authStore.me.display_name}

          <button onClick={handleLogout} label="Sign out">
            <i className="fas fa-sign-out-alt" />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default observer(UserBar);

const Container = styled.div`
  color: ${(props) => props.theme.foregroundMuted};
  position: absolute;
  bottom: ${(props) => props.theme.spacing.md};
  @media (min-width: 576px) {
    position: static;
  }
  button {
    background: none;
    border: none;
    padding: 0;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: ${(props) => props.theme.borderRadius.circle};
    margin-right: ${(props) => props.theme.spacing.sm};
  }
  .user {
    position: relative;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    .fa {
      margin-left: ${(props) => props.theme.spacing.md};
    }
    button {
      cursor: pointer;
      color: inherit;
      margin-left: ${(props) => props.theme.spacing.sm};
    }
    .social-fb {
      font-size: 1.5rem;
      color: ${(props) => props.theme.facebook};
      margin-right: ${(props) => props.theme.spacing.md};
    }
  }
`;
