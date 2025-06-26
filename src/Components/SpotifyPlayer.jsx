import React, { useEffect, useState } from 'react';

export function SpotifyPlayer({ spotifyID }) {
    return (
        <iframe
            src={`https://open.spotify.com/embed/track/${spotifyID}?utm_source=generator&theme=0&compact=1`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        />
    )
}