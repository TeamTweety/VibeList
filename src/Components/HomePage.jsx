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
        //         sessionStorage.setItem('userVibe', userVibe)
        //         navigate ('/playlist')
        //     } else {
        //         alert ('Unknown Error: Try Refreshing the page!')
        //     }  
        // } catch (err) {
        //     console.log('UserSubmit Error: ' +  err);
        //     alert ('Unknown Error: Try Refreshing the page!')
        // }

        sessionStorage.setItem('userVibe', userVibe) //! Delete after backend is connected
        navigate ('/playlist') //! Delete after backend is connected
    }

    return (
        <div className="homePage">
            <h2>hello, testing</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder='Insert your current vibe' 
                value={userVibe} 
                onChange={(e) => setUserVibe(e.target.value)}/>
            </form>
        </div>
    )
}