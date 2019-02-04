import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'mobx-react'
import stores from './stores'
import GlobalStyle from './styled'
import '@fortawesome/fontawesome-free/css/all.css'
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
