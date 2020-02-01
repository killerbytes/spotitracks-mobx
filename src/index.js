import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/solid';
import 'normalize.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyle from './styled';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import stores from './stores';

ReactGA.initialize('UA-47322639-3');
/* eslint import/no-webpack-loader-syntax: off */
const theme = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./styled/theme.scss');

ReactDOM.render(
  <Provider {...stores}>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <App />
        <GlobalStyle />
      </React.Fragment>
    </ThemeProvider>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
