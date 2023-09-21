import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'stores';
import styled from 'styled-components';

const UserBar = () => {
  const { myStore } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    myStore.removeToken();

    navigate('/');
  };

  const Avatar = () => {
    let img = myStore.me.images.length > 0 ? myStore.me.images[0] : undefined;
    if (img) {
      return <img src={img.url} alt="" />;
    }
    return <img src={`https://ui-avatars.com/api/?name=${myStore.me.display_name}`} alt="" />;
  };

  return (
    <Container className="user-bar">
      <div className="user">
        <a className="social-fb" href="https://www.facebook.com/Spotitracks-189230884967129/">
          <i className="fab fa-facebook" />
        </a>
        <Avatar />
        <div>
          {myStore.me.display_name}

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
  color: ${(props) => props.theme.lightBg2};
  position: absolute;
  bottom: 1rem;
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
    border-radius: 100px;
    margin-right: 0.5rem;
  }
  .user {
    position: relative;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    .fa {
      margin-left: 1rem;
    }
    button {
      cursor: pointer;
      color: inherit;
      margin-left: 0.5rem;
    }
    .social-fb {
      font-size: 20px;
      color: #4267b2;
      margin-right: 1rem;
    }
  }
`;
