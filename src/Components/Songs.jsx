import React, { useEffect, useState } from 'react';
import { SpotifyPlayer } from './SpotifyPlayer';

export function Songs ({ songname, artist, spotifyID, index }) {
    return (
        <div className="song">
            <h4>{songname}</h4>
            <p>by {artist}</p>
            <button onClick={() => onRefresh(index)}> Refresh</button>
            <SpotifyPlayer spotifyID={spotifyID}/>
        </div>
    )
}