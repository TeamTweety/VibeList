import React, { useEffect, useState } from 'react';
import reloadIcon from '../assets/refresh_arrow_360.png'
// import hoverIcon from './assets/refresh_arrow_white_360.png';

export function RefreshPlaylist({refreshList}){
  return (
    <button className="refreshButton" onClick={refreshList}>
      <img src={reloadIcon} alt="Refresh Playlist" className="reload-icon" />
      
    </button>
  )
}

// refreshed songs are new, not duplicates or parts= of the prev playlist
// rejected songs don't come back again
// send the backedn that info so it knows not to send the same 

