import { Route, Routes } from 'react-router-dom';
import Blocker from 'modules/Blocker';
import Callback from 'modules/Callback';
// import Charts from 'modules/Charts';
import Landing from 'modules/Landing';
import PlaylistDetail from 'modules/Playlists/PlaylistDetail';
import Playlists from 'modules/Playlists';
import React from 'react';
import TopTracks from 'modules/TopTracks';
import RequireAuth from 'components/RequireAuth';
import SidebarLayout from 'components/SidebarLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SidebarLayout />}>
        {/* 
    // 
    <AuthenticatedRoute path="/charts" component={Charts} />
   */}
        {/* 

  //  */}

        <Route path="/playlists">
          <Route
            index
            element={
              <RequireAuth>
                <Playlists />
              </RequireAuth>
            }
          />
          <Route path=":id" element={<PlaylistDetail />} />
        </Route>
        <Route
          path="top-tracks"
          element={
            <RequireAuth>
              <TopTracks />
            </RequireAuth>
          }
        />
        <Route
          path="/blocker"
          element={
            <RequireAuth>
              <Blocker />
            </RequireAuth>
          }
        />
      </Route>
      <Route index element={<Landing />} />
      <Route path="callback" element={<Callback />} />
    </Routes>
  );
};

export default App;
