import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Callback from 'modules/Callback'
import Playlists from 'modules/Playlists'
import PlaylistDetail from 'modules/Playlists/PlaylistDetail'
import Landing from 'modules/Landing'
import TopTracks from 'modules/TopTracks'
import AuthenticatedRoute from 'components/AuthenticatedRoute'

const Main = styled.div`
  background: ${props => props.theme.primary};
`
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/callback" component={Callback} />
          <AuthenticatedRoute path="/playlists/:id" component={PlaylistDetail} />
          <AuthenticatedRoute path="/playlists" component={Playlists} />
          <AuthenticatedRoute path="/top-tracks" component={TopTracks} />

          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    )
  }
}

export default App
