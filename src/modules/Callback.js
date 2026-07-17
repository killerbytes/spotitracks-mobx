import Loading from 'components/Loading';
import React, { useCallback, useEffect, useRef } from 'react';
import qs from 'query-string';
import { useStore } from 'stores';
import { useLocation, useNavigate } from 'react-router-dom';

const Callback = () => {
  const { authStore } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { code } = qs.parse(location.search);
  const initialized = useRef(false);

  const getData = useCallback(() => {
    authStore.login(code).then((res) => {
      if (res.data.error === 'invalid_grant') {
        navigate('/');
      } else if (res.data.access_token) {
        const redir = sessionStorage.getItem('SPOTITRACKS_REDIR');
        authStore.setToken(res.data);

        if (redir) {
          navigate(redir);
          sessionStorage.removeItem('SPOTITRACKS_REDIR');
        } else {
          navigate('/top-tracks');
        }
      }
    });
  }, [code, authStore, navigate]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getData();
    }
  }, [getData]);

  return <Loading />;
};

export default Callback;
