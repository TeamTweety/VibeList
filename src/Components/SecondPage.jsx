import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Playlist } from './Playlist';
import { NavBar } from './NavBar';

export function SecondPage() {
    return (
        <div>
            <NavBar/>
            <h2>Second Page</h2>
            <Playlist/>
        </div>
    )
}