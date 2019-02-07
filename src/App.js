import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#000'
};

let fakeSpotifyPlaylist = {
  user: {
    name: 'Raphael',
    playlists: [
      {
        name: 'Grunge',
        songs: [
          {name: 'Come as you are', duration: 1345},
          {name: 'Is that right?', duration: 1236},
          {name: 'Hello there!', duration: 70000}
        ]
      },
      {
        name: 'Pop',
        songs: [
          {name: 'Overnight', duration: 1345},
          {name: 'Simple', duration: 1236},
          {name: 'Love', duration: 70000}
        ]
      },
      {
        name: 'Dance',
        songs: [
          {name: 'Hey you', duration: 1345},
          {name: 'Bye', duration: 1236},
          {name: 'Hell', duration: 70000}
        ]
      },
      {
        name: 'Metal',
        songs: [
          {name: 'Plate', duration: 1345},
          {name: 'Black bird', duration: 1236},
          {name: 'Long hair', duration: 70000}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render () {
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>Number of playlists: {this.props.playlists.length}</h2>
      </div>
    );
  }
}

class TotalHours extends Component {
  render () {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
        return songs.concat(eachPlaylist.songs)
    }, []);

    let totalDuration = allSongs.reduce((sum, eachSong) => {
        return sum + eachSong.duration;
    }, 0);

    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>Total of hours: {Math.round(totalDuration/60)}</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render () {
    return (
      <div style={{defaultStyle}}>
      <img/>
        <input type="text" onKeyUp={event =>
        this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render () {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {
            playlist.songs.map(song =>
              <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      spotifyServerDate: {},
      filterString: ''
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(
        {
          spotifyServerDate: fakeSpotifyPlaylist
        }
      );
    }, 1000);
  }

  render() {
    let playlistToShow = this.state.spotifyServerDate.user ?
      this.state.spotifyServerDate.user.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLocaleLowerCase())
      ) : []

    return (
      <div className="App">
        {
          this.state.spotifyServerDate.user ?
          <div>
            <h1 style={{...defaultStyle, 'font-size': '54px'}}>Spotifood</h1>
            <h2>{this.state.spotifyServerDate.user.name}'s playlist</h2>
            <PlaylistCounter playlists={playlistToShow}/>
            <TotalHours playlists={playlistToShow}/>
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {
              playlistToShow.map(playlist =>
                <Playlist playlist={playlist}/>
            )}
          </div> : <h1 style={defaultStyle}>Getting data from Spotify API!</h1>
        }
      </div>
    );
  }
}

export default App;
