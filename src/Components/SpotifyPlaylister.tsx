import React, { useEffect, useState } from 'react';

import spotify from '../assets/spotify.png'

export function SpotifyPlaylister () {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSpotifyConnect = async () => {
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('/test', { //! Change this to w/e route Joao/Parker decide
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentPlaylist: JSON.parse(sessionStorage.getItem('currentPlaylist'))
                })
            });

            if (response.ok) {
                const data = await response.json();

                if (data.playlistURI) {
                    await navigator.clipboard.writeText(data.playlistURI);
                    setMessage('Spotify playlist URI copied to clipboard!')
                } else {
                    setMessage('No playlist URI received');
                }
            } else {
                setMessage('Failed to create playlist');
            }
        } catch (error) {
            console.error('Error in response to /test: ', error);
            setMessage('Error in creating playlist');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="spotifyPlaylister">
            
            <button className="spotify-button" onClick={handleSpotifyConnect} disabled={isLoading}> 
                <img src={spotify} alt="Spotify Icon" width="50" height="50"/>
            </button>
            
            <div>
                <p>{isLoading ? 'Creating playlist...' : 'Add to my Spotify!'}</p>
                {message && <p style={{ fontSize: '0.8rem', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
            </div>
        </div>
    )
}