import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'mobx-react'
import stores from './stores'
import GlobalStyle from './styled'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-47322639-3')

import 'normalize.css'

const theme = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./styled/theme.scss')

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
)
registerServiceWorker()

// navigator.serviceWorker
//   .getRegistrations()
//   .then(function(registrations) {
//     for (let registration of registrations) {
//       registration.unregister()
//     }
//   })
//   .catch(function(err) {
//     console.log('Service Worker registration failed: ', err)
//   })
