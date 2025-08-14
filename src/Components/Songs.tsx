import React, { useEffect, useState } from 'react';

import { SpotifyPlayer } from './SpotifyPlayer';
import refreshIcon from '../assets/refresh_arrow_360.png';

export function Songs({
  songname,
  artist,
  spotifyID,
  index,
  userVibe,
  currentPlaylist,
  rejectedSongs,
  onSongUpdate,
}) {
  const onRefresh = async (songIndex) => {
    try {
      const response = await fetch('/refreshSong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userVibe,
          currentPlaylist,
          rejectedSongs,
          songIndex: songIndex,
          numOfSongs: 1,
        }),
      });

      if (response.ok) {
        const updatedSong = await response.json();
        console.log(updatedSong)
        const updatedSong2 = updatedSong[0]
        onSongUpdate(songIndex, updatedSong2);
      } else {
        console.error('Response error. Response code: ', response.status);
      }
    } catch (error) {
      console.error('Error refreshing song: ', error);
    }
  };

  return (
    <div className='song'>
      <button onClick={() => onRefresh(index)} style={{ cursor: 'pointer' }}>
        <img src={refreshIcon} alt='Refresh' width='15' height='15' />
      </button>
      <SpotifyPlayer spotifyID={spotifyID} />
    </div>
  );
}
