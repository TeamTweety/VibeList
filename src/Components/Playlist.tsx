import React, { useEffect, useState } from 'react';

import { Songs } from './Songs';
import { RefreshPlaylist } from './RefreshPlaylist';

export function Playlist() {
  const [currentVibe, setCurrentVibe] = useState('');
  const [songs, setSongs] = useState([]);
  const [rejectedSongs, setRejectedSongs] = useState([]);

  useEffect(() => {
    // For setting Playlist header from sessionStorage
    const storedVibe = sessionStorage.getItem('userVibe');
    if (storedVibe) {
      setCurrentVibe(storedVibe);
    }
  }, []);

  useEffect(() => {
    // Loading reject songs from session storage
    const rejectStore = sessionStorage.getItem('rejectedSongs');
    if (rejectStore) {
      setRejectedSongs(JSON.parse(rejectStore));
    }
  }, []);

  useEffect(() => { 
    // Save rejected songs to session storage w/e it changes
    if (rejectedSongs.length > 0) {
      sessionStorage.setItem('rejectedSongs', JSON.stringify(rejectedSongs));
    }
  }, [rejectedSongs]);

  useEffect(() => { 
    // For controlling the song mapping
    const currentPlaylist = JSON.parse(
      sessionStorage.getItem('currentPlaylist')
    ); 
    setSongs(currentPlaylist);
  }, []);

  const handleSongUpdate = (songIndex, updatedSong) => {
    setRejectedSongs((prev) => [...prev, songs[songIndex]]); // This will set old song to rejected list!

    const newSongs = [...songs]; // This functionality replaces prior array of songs
    newSongs[songIndex] = {
      track: updatedSong.track,
      artist: updatedSong.artist,
      spotifyID: updatedSong.spotifyID,
    };
    sessionStorage.setItem("currentPlaylist",JSON.stringify(newSongs))
    setSongs(newSongs);
  };

  async function handleRefresh() {
  const userVibe = sessionStorage.getItem('userVibe');
  const currentPlaylist = sessionStorage.getItem('currentPlaylist')
  const rejectedSongs = sessionStorage.getItem('rejectedSongs')

  try {
    const response = await fetch('/refreshPlaylist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userVibe, currentPlaylist, rejectedSongs
      }),
    });

    const data = await response.json();

    if (data) {
      setSongs(data);
      
    }
  } catch (err) {
    console.error('Error refreshing playlist:', err);
  }
}

  return (
    <div className='playlist'>
      {/* Header Div */}
      <div className='playlist-header'>
        <h3>
          Here is your <span className='vibe-text'>{currentVibe}</span> playlist
        </h3>
        <RefreshPlaylist refreshList={handleRefresh} />
      </div>

      {/* Song List Divs */}
      <div className="song-list">
        {songs.map((songS, index) => (
          <Songs
            key={index}
            songname={songS.track}
            artist={songS.artist}
            spotifyID={songS.spotifyID}
            index={index}
            userVibe={currentVibe}
            currentPlaylist={songs}
            rejectedSongs={rejectedSongs}
            onSongUpdate={handleSongUpdate}
          />
        ))}
      </div>
    </div>
  );
}
