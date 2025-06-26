import React, { useEffect, useState } from 'react';

export function Visualizer ({ isPlaying = true }) {
    return (
        <div className={`visualizer ${isPlaying ? 'active' : ''}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
    )
}