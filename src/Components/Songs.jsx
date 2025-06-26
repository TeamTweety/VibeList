import React, { useEffect, useState } from 'react';

import { SpotifyPlayer } from './SpotifyPlayer';
import refreshIcon from '../assets/refreshIcon.png'

export function Songs ({ songname, artist, spotifyID, index }) { //! Need to add element to button so I can do cursor: pointer
    return (
        <div className="song">
            <button onClick={() => onRefresh(index)}> 
                <img src={refreshIcon} alt="Refresh" width="16" height="16"/>
            </button>
            <h4>{songname}</h4>
            <p>by {artist}</p>
            <SpotifyPlayer spotifyID={spotifyID}/>
        </div>
    )
}