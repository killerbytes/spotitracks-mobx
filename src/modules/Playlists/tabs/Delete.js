import { decorate, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import BottomGradient from '../../../styled/BottomGradient';
import CheckBox from 'components/CheckBox';
import Modal from 'components/Modal';
import PlaylistStyle from 'styled/Playlist';
import React from 'react';
import ReactGA from 'react-ga';

class Merge extends React.Component {
  selected = [];
  formValues = {
    name: '',
  };
  modal = {
    playlist: false,
  };
  toggleModal = (name) => {
    this.modal[name] = !this.modal[name];
  };

  handleToggle = (item) => {
    if (this.selected.indexOf(item) > -1) {
      this.selected = this.selected.filter((s) => s !== item);
    } else {
      this.selected = [...this.selected, item];
    }
  };
  handleSubmit = () => {
    const { commonStore, playlistStore, onSubmit } = this.props;
    this.selected.forEach(() => {});
    const promises = this.selected.map((item) => {
      return () => playlistStore.deletePlaylist(item.id);
    });
    commonStore.isLoading = true;
    Promise.all(promises.map((item) => item())).then(() => {
      ReactGA.event({
        category: 'Playlists',
        action: 'DELETE',
      });

      onSubmit();
      commonStore.isLoading = false;
      this.toggleModal('playlist');
      this.selected = [];
    });
  };
  render() {
    const { items } = this.props;

    const mappedPlaylists = items.map((item, key) => (
      <li key={key}>
        <CheckBox checked={this.selected.indexOf(item) > -1} onChange={() => this.handleToggle(item)}>
          {item.name} <small>({item.tracks.total})</small>
        </CheckBox>
      </li>
    ));
    return (
      <React.Fragment>
        <div className="container">
          <PlaylistStyle>{mappedPlaylists}</PlaylistStyle>
        </div>
        <BottomGradient>
          <div className="container">
            {this.selected.length > 0 && (
              <button className="btn btn-fab" onClick={() => this.toggleModal('playlist')}>
                <i className="fas fa-check" />
              </button>
            )}
          </div>
        </BottomGradient>
        {this.modal['playlist'] && (
          <Modal title={`Warning`} onToggle={() => this.toggleModal('playlist')}>
            {() => (
              <React.Fragment>
                <p>Are you sure you want to delete the selected playlists?</p>
                <p>
                  <small>
                    Accidentally deleted a playlist?
                    <a href="https://www.spotify.com/us/account/recover-playlists/">
                      https://www.spotify.com/us/account/recover-playlists/
                    </a>
                  </small>
                </p>
                <div className="form-footer">
                  <button className="btn btn-default" onClick={() => this.toggleModal('playlist')}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={this.handleSubmit}>
                    Submit
                  </button>
                </div>
              </React.Fragment>
            )}
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default inject(
  'playlistStore',
  'myStore',
  'commonStore'
)(
  observer(
    decorate(Merge, {
      selected: observable,
      formValues: observable,
      modal: observable,
    })
  )
);
