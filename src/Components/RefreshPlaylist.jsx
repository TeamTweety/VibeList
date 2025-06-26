import React, { useEffect, useState } from 'react';
export function RefreshPlaylist({refreshList}){
  return (
    <button className="refreshButton" onClick={refreshList}>
      New Playlist
    </button>
  )
}

// refreshed songs are new, not duplicates or parts= of the prev playlist
// rejected songs don't come back again
// send the backedn that info so it knows not to send the same 

