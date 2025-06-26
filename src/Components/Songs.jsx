import React, { useEffect, useState } from 'react';

import { SpotifyPlayer } from './SpotifyPlayer';
import refreshIcon from '../assets/refreshIcon.png'

export function Songs ({ songname, artist, spotifyID, index, userVibe, currentPlaylist, rejectedSongs, onSongUpdate }) {

    const onRefresh = async (songIndex) => {
        try {
            const response = await fetch ('/refreshSong', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    userVibe,
                    currentPlaylist,
                    rejectedSongs,
                    songIndex: songIndex,
                    numOfSongs: 1
                })
            });

            if (response.ok) {
                const updatedSong = await response.json();
                onSongUpdate(songIndex, updatedSong);
            } else {
                console.error('Response error. Response code: ', response.status)
            }
        } catch (error) {
            console.error ('Error refreshing song: ', error)
        }
    };

    return (
        <div className="song">
            <button onClick={() => onRefresh(index)} style={{ cursor: 'pointer'}}> 
                <img src={refreshIcon} alt="Refresh" width="16" height="16"/>
            </button>
            <h4>{songname}</h4>
            <p>by {artist}</p>
            <SpotifyPlayer spotifyID={spotifyID}/>
        </div>
    )
}