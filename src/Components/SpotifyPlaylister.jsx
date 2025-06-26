import React, { useEffect, useState } from 'react';

import spotify from '../assets/spotify.png'

export function SpotifyPlaylister () {
    return (
        <div className="spotifyPlaylister">
            <button className="spotify-button" onClick={() => console.log('we add functionality to connect SPotify here')}> 
                <img src={spotify} alt="Spotify Icon" width="50" height="50"/>
            </button>
            <p>Add to my Spotify!</p>
        </div>
    )
}