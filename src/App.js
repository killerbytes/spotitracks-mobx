import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import AuthenticatedRoute from 'components/AuthenticatedRoute'
import Blocker from 'modules/Blocker'
import Callback from 'modules/Callback'
import Charts from 'modules/Charts'
import Landing from 'modules/Landing'
import PlaylistContainer from 'modules/Playlists/PlaylistContainer'
import Playlists from 'modules/Playlists'
import React from 'react'
import ScrollToTop from 'components/ScrollToTop'
import styled from 'styled-components'
import TopTracks from 'modules/TopTracks'

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
            <AuthenticatedRoute path="/blocker" component={Blocker} />

            <Route path="/" component={Landing} />
          </Switch>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
