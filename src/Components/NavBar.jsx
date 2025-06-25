import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function NavBar() {
    return (
        <div>
            <Link to="/">Search for a new Vibe</Link>
        </div>
    )
}