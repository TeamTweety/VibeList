import React, { useEffect, useState } from 'react';

import { Songs } from './Songs';

export function Playlist () {
    const [currentVibe, setCurrentVibe] = useState('');
    const [songs, setSongs] = useState([])

    useEffect(() => { // For setting Playlist header from sessionStorage
        const storedVibe = sessionStorage.getItem('userVibe');
        if (storedVibe) {
            setCurrentVibe(storedVibe);
        }
    }, []);

    useEffect(() => { // For controlling the song mapping
        const currentPlaylist = [ //! mockPlaylist. Replace with session stuff after!
            {
                track: "Bohemian Rhapsody",
                artist: "Queen",
                spotifyID: "7tFiyTwD0nx5a1eklYtX2J"
            },
            {
                track: "Billie Jean",
                artist: "Michael Jackson",
                spotifyID: "7tFiyTwD0nx5a1eklYtX2J"
            },
            {
                track: "Imagine",
                artist: "John Lennon",
                spotifyID: "7tFiyTwD0nx5a1eklYtX2J"
            },
            {
                track: "Smells Like Teen Spirit",
                artist: "Nirvana",
                spotifyID: "7tFiyTwD0nx5a1eklYtX2J"
            },
            {
                track: "Shape of You",
                artist: "Ed Sheeran",
                spotifyID: "7tFiyTwD0nx5a1eklYtX2J"
            }
            ];

            setSongs(currentPlaylist);
    }, [])
    
    return (
        <div className="playlist">
            {/* Header Div */}
            <div className="playlist-header">
                <h3>Current Vibe: {currentVibe}</h3>
            </div>

            {/* Song List Divs */}
            <div>
                {songs.map((songS, index) => (
                    <Songs
                    key={index}
                    songname={songS.track}
                    artist={songS.artist}
                    spotifyID={songS.spotifyID}
                    index={index}
                    />
                ))}
            </div>
            
        </div>
    )
}