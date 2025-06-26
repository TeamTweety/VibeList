


// const response = await fetch(`/backendRoute?vibe=${sameVibe}`);


 const [rejectedSongs, setRejectedSongs] = useState([]);
//   state for rejected songs
function handleSingleSongReject(rejectedSong) {
  setRejectedSongs(prev => [...prev, rejectedSong.spotifyID]);
}
// store the rejected songs

async function handleRefresh() {
  const userVibe = sessionStorage.getItem('userVibe');
  const currentPlaylist = sessionStorage.getItem('currentPlalist')
  const rejectedSongs = sessionStorage.getItem('rejectedSongs')

  try {
    const response = await fetch('/api/backendRoute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userVibe, currentPlaylist, rejectedSongs
        
      }),
    });

    const data = await response.json();

    if (data) {
      setSongs(data);
    }
  } catch (err) {
    console.error('Error refreshing playlist:', err);
  }
}

<RefreshPlaylist refreshList={handleRefresh} />
// to pass as prop 