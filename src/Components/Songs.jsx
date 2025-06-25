import React, { useEffect, useState } from 'react';

export function Songs ({ songname, artist }) {
    return (
        <div>
            <h4>{songname}</h4>
            <p>by {artist}</p>
        </div>
    )
}