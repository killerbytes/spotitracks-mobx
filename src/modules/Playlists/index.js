import { decorate, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Delete from './tabs/Delete';
import Merge from './tabs/Merge';
import PlaylistTab from './tabs/Playlists';
import React from 'react';
import Tabs from 'styled/Tabs';

class Playlists extends React.Component {
  tab = 0;
  componentDidMount() {
    const { myStore } = this.props;
    myStore.getPlaylists();
  }
  handleTabClick = (tab) => {
    this.tab = tab;
  };

  handleSubmit = () => {
    const { myStore } = this.props;
    myStore.getPlaylists();
  };
  render() {
    const { myStore } = this.props;
    return (
      <React.Fragment>
        <Tabs>
          <nav className="container">
            <button onClick={() => this.handleTabClick(0)} className={this.tab === 0 ? 'active' : ''}>
              PLAYLISTS
              <span className="line" />
            </button>
            <button onClick={() => this.handleTabClick(1)} className={this.tab === 1 ? 'active' : ''}>
              MERGE
              <span className="line" />
            </button>
            <button onClick={() => this.handleTabClick(2)} className={this.tab === 2 ? 'active' : ''}>
              DELETE
              <span className="line" />
            </button>
          </nav>
        </Tabs>
        {this.tab === 0 && <PlaylistTab items={myStore.playlists.items} />}
        {this.tab === 1 && <Merge items={myStore.playlists.items} onSubmit={this.handleSubmit} />}
        {this.tab === 2 && <Delete items={myStore.playlists.items} onSubmit={this.handleSubmit} />}
      </React.Fragment>
    );
  }
}

export default inject(
  'myStore',
  'playlistStore'
)(
  observer(
    decorate(Playlists, {
      tab: observable,
    })
  )
);
