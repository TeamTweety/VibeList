import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function NavBar() {
    return (
        <div className="navBar">
            <Link to="/" className="nav-link">Search for a new Vibe</Link>
        </div>
    )
}