import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Callback from 'modules/Callback'
import Playlists from 'modules/Playlists'
import PlaylistContainer from 'modules/Playlists/PlaylistContainer'
import Landing from 'modules/Landing'
import TopTracks from 'modules/TopTracks'
import AuthenticatedRoute from 'components/AuthenticatedRoute'
import Charts from 'modules/Charts'
import ScrollToTop from 'components/ScrollToTop'

const Main = styled.div`
  background: ${props => props.theme.primary};
`
class App extends React.Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/callback" component={Callback} />
            <AuthenticatedRoute path="/playlists/:id" component={PlaylistContainer} />
            <AuthenticatedRoute path="/playlists" component={Playlists} />
            <AuthenticatedRoute path="/top-tracks" component={TopTracks} />
            <AuthenticatedRoute path="/charts" component={Charts} />

            <Route path="/" component={Landing} />
          </Switch>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
