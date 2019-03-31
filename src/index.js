import '@fortawesome/fontawesome-free/js/brands'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/solid'
import { Provider } from 'mobx-react'
import { ThemeProvider } from 'styled-components'
import App from './App'
import GlobalStyle from './styled'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import registerServiceWorker from './registerServiceWorker'
import stores from './stores'

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
