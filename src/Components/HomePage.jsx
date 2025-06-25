import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function HomePage() {
    const [userVibe, setUserVibe] = useState('')

    async function handleSubmit (event) {
        event.preventDefault();

        try {
            const response = await fetch ('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userVibe)
            })

            if (response.ok) {
                navigate ('/playlist')
            } else {
                alert ('Unknown Error: Try Refreshing the page!')
            }  
        } catch (err) {
            console.log('UserSubmit Error: ' +  err);
            alert ('Unknown Error: Try Refreshing the page!')
        }
    }

    return (
        <div className="homePage">
            <h2>hello, testing</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder='Insert your current vibe' onChange={setUserVibe}/>
            </form>
        </div>
    )
}