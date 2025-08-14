import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Playlist } from './Playlist';
import { NavBar } from './NavBar';
import { BotBar } from './BotBar';
import { Visualizer } from './Visualizer';

export function SecondPage() {
    return (
        <div className="secondPage">
            <NavBar/>
            <Visualizer isPlaying={true}/>
            <Playlist/>
            <BotBar/>
        </div>
    )
}