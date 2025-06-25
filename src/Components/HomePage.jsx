import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();
    const [userVibe, setUserVibe] = useState('');

    async function handleSubmit (event) {
        event.preventDefault();

        // try {
        //     const response = await fetch ('/search', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(userVibe)
        //     })

        //     if (response.ok) {
        //         navigate ('/playlist')
        //     } else {
        //         alert ('Unknown Error: Try Refreshing the page!')
        //     }  
        // } catch (err) {
        //     console.log('UserSubmit Error: ' +  err);
        //     alert ('Unknown Error: Try Refreshing the page!')
        // }

        navigate ('/playlist') //! Delete after backend is connected
    }

    return (
        <div id="homePage">
             <header id="mainHeader">
            
              </header>
            <form id ="formStyle" onSubmit={handleSubmit}>
              <h1 id="promptQuestion">What’s Your Vibe? We’ve Got the Music!</h1>
              <input 
                id="inputStyle"
                type="text" 
                // placeholder='Insert your current vibe' 
                value={userVibe} 
                onChange={(e) => setUserVibe(e.target.value)}/>
            </form>
        </div>
    )
}