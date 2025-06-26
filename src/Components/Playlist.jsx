import React, { useEffect, useState } from 'react';

import { Songs } from './Songs';
// import { RefreshPlaylist } from './RefreshPlaylist';

export function Playlist () {
    const [currentVibe, setCurrentVibe] = useState('');
    const [songs, setSongs] = useState([]);
    const [rejectedSongs, setRejectedSongs] = useState([]);

    useEffect(() => { // For setting Playlist header from sessionStorage
        const storedVibe = sessionStorage.getItem('userVibe');
        if (storedVibe) {
            setCurrentVibe(storedVibe);
        }
    }, []);

    useEffect(() => { // Loading reject songs from session storage
        const rejectStore = sessionStorage.getItem('rejectedSongs');
        if (rejectStore) {
            setRejectedSongs(JSON.parse(rejectStore));
        }
    }, [])

    useEffect(() => { // Save rejected songs to session storage w/e it changes
        if (rejectedSongs.length > 0) {
            sessionStorage.setItem('rejectedSongs', JSON.stringify(rejectedSongs))
        }
    }, [rejectedSongs])

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
            // const currentPlaylist = JSON.parse(sessionStorage.getItem('currentPlaylist')) //! Comment in when we get backend working!
            setSongs(currentPlaylist);
    }, []);

    const handleSongUpdate = (songIndex, updatedSong) => {
        setRejectedSongs(prev => [...prev, songs[songIndex]]); // This will set old song to rejected list!
        
        const newSongs = [...songs]; // This functionality replaces prior array of songs
        newSongs[songIndex] = {
            track: updatedSong.track,
            artist: updatedSong.artist,
            spotifyID: updatedSong.spotifyID
        };
        setSongs(newSongs);
    }
    
    return (
        <div className="playlist">
            {/* Header Div */}
            <div className="playlist-header">
                <h3>Current Vibe: <span className="vibe-text">{currentVibe}</span></h3>
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
                    userVibe={currentVibe}
                    currentPlaylist={songs}
                    rejectedSongs={rejectedSongs}
                    onSongUpdate={handleSongUpdate}
                    />
                ))}
            </div>
            
        </div>
    )
}