import { Link, NavLink } from 'react-router-dom';
import BottomGradient from 'styled/BottomGradient';
import React from 'react';
import { List, ListItem, ListItemContent, ListItemDescription, ListItemImage, ListItemText } from 'components/List';

class MyPlaylists extends React.Component {
  selected = [];
  handleToggle = (item) => {
    if (this.selected.indexOf(item) > -1) {
      this.selected = this.selected.filter((s) => s !== item);
    } else {
      this.selected = [...this.selected, item];
    }
  };
  handleSubmit = () => {
    const { playlistStore, authStore } = this.props;
    let tracks = [];
    let req = [];
    this.selected.forEach((playlist) => {
      req.push(playlistStore.getAllPlaylistTracks(playlist.id));
    });

    Promise.all(req).then((res) => {
      res.forEach((item) => {
        tracks = [...tracks, ...item];
      });
      playlistStore.createPlaylistAddTracks(
        authStore.me.id,
        'merge',
        tracks.map((item) => item.track)
      );
    });
  };
  render() {
    const { items } = this.props;

    return (
      <React.Fragment>
        <div className="container">
          <List>
            {items.map((item, key) => (
              <ListItem key={key}>
                {item.images[0].url && <ListItemImage src={item.images[0].url} alt={item.name} />}
                <ListItemContent to={`${item.id}`}>
                  <ListItemText>{item.name}</ListItemText>
                  <ListItemDescription>{item.tracks.total} tracks</ListItemDescription>
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        </div>
        <BottomGradient />
      </React.Fragment>
    );
  }
}

export default MyPlaylists;
