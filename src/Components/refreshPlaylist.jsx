import React, { useEffect, useState } from 'react';
export function refreshPlaylist({onRefresh}){
  return (
    <button className="refreshButton" onClick={onRefresh}>
      New Playlist
    </button>
  )
}