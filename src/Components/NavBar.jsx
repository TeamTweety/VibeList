import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import vibelist_logo from '../assets/vibelist_logo.png'

export function NavBar() {
    const navigate = useNavigate();

    return (
        <div className="navBar">
            <button onClick={() => navigate('/')} style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}>
                <img src={vibelist_logo} alt='Homepage-Nav' width='150' height='150' />
            </button>
        </div>
    )
}