import { decorate, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
// import Firebase from 'firebase-admin';
import React from 'react';
// import serviceAccount from '../service-account-file.json';

// Firebase.initializeApp({
//   credential: Firebase.credential.cert(serviceAccount),
//   databaseURL: 'https://spotitracks.firebaseio.com',
// });

class Blocker extends React.Component {
  playing = { item: { artists: [] } };
  blocked = [];

  getCurrentPlaying = () => {
    const { myStore } = this.props;
    setTimeout(() => {
      myStore.getCurrentPlaying().then((res) => {
        this.playing = res;
        const found = this.playing && this.blocked && this.blocked.find((i) => i.item.id === this.playing.item.id);
        if (found) {
          myStore.nextTrack();
        }
        this.getCurrentPlaying();
      });
    }, 3000);
  };
  componentDidMount() {
    this.blocked = JSON.parse(localStorage.getItem('blocked')) || [];
    // this.getCurrentPlaying()
  }
  handleBlock = () => {
    const { myStore } = this.props;

    myStore.nextTrack();
    this.blocked.push(this.playing);
    localStorage.setItem('blocked', JSON.stringify(this.blocked));
  };
  render() {
    const { item } = this.playing;
    const mappedBlocked = this.blocked.map((i, key) => {
      return (
        <li key={key}>
          {i.item.name} -{' '}
          {i.item.artists
            .map((artist) => artist.name)
            .toString()
            .replace(',', ', ')}
        </li>
      );
    });
    return (
      <div className="container">
        {item && (
          <React.Fragment>
            <strong>{item.name}</strong> <br />
            {item.artists
              .map((artist) => artist.name)
              .toString()
              .replace(',', ', ')}
            <button onClick={this.handleBlock}>Block</button>
            <ul>{mappedBlocked}</ul>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default inject('myStore')(
  observer(
    decorate(Blocker, {
      playing: observable,
      blocked: observable,
    })
  )
);
