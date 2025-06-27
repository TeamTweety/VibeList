import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();
    const [userVibe, setUserVibe] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit (event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            console.log('making fetch request to /search');

            const response = await fetch ('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userVibe: userVibe})
            })

            console.log('Response status: ', response.status)

            if (response.ok) {
                const playlistData = await response.json();
                sessionStorage.setItem('userVibe', userVibe)
                sessionStorage.setItem('currentPlaylist', JSON.stringify(playlistData));
                navigate ('/playlist')
            } else {
                alert ('Response Error: Try Refreshing the page!')
            }  
        } catch (err) {
            console.log('UserSubmit Error: ' +  err);
            alert ('Unknown Error: Try Refreshing the page!')
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div id="homePage">
             <div className="logo-container">
                <img src="./src/assets/vibelist_logo.png" alt="Logo" className="logo" />
             </div>
            <form id ="formStyle" onSubmit={handleSubmit}>
              <h1 id="promptQuestion">Your Vibes. Our playlist</h1>
              <input 
                id="inputStyle"
                className={isLoading ? 'loading' : ''}
                type="text" 
                // placeholder='Insert your current vibe' 
                value={userVibe} 
                onChange={(e) => setUserVibe(e.target.value)}
                disabled={isLoading} // prevent multiple requests to the backend
                />
              <button type="submit" style={{display : 'none'}}>Submit</button>
            </form>
        </div>
    )
}