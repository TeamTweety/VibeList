import React, { useEffect, useState } from 'react';

import { SpotifyPlaylister } from './SpotifyPlaylister';

export function BotBar () {
    return (
        <div className="botBar">
            <SpotifyPlaylister/>
        </div>
    )
}