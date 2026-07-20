import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/solid';
import 'normalize.css';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyle from './styled';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import ReactGA from 'react-ga';
import theme from 'styled/theme';
import ScrollToTop from 'components/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';
import stores, { StoreContext } from 'stores';
import * as Sentry from '@sentry/react';

ReactGA.initialize('UA-47322639-3');

Sentry.init({
  dsn: 'https://b04d0d501d2bc4a8668761fa97da188e@o4510944413483008.ingest.us.sentry.io/4511766649503748',
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: []
  },
});

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <StoreContext.Provider value={stores}>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <ScrollToTop>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ScrollToTop>
      </React.Fragment>
    </ThemeProvider>
  </StoreContext.Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
