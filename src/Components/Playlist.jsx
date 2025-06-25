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
                song: "Bohemian Rhapsody",
                artist: "Queen"
            },
            {
                song: "Billie Jean",
                artist: "Michael Jackson"
            },
            {
                song: "Imagine",
                artist: "John Lennon"
            },
            {
                song: "Smells Like Teen Spirit",
                artist: "Nirvana"
            },
            {
                song: "Shape of You",
                artist: "Ed Sheeran"
            }
            ];

            setSongs(currentPlaylist);
    }, [])
    
    return (
        <div>
            {/* Header Div */}
            <div>
                <h3>Current Vibe: {currentVibe}</h3>
            </div>

            {/* Song List Divs */}
            <div>
                {songs.map((songS, index) => (
                    <Songs
                    key={index}
                    songname={songS.song}
                    artist={songS.artist}
                    />
                ))}
            </div>
            
        </div>
    )
}