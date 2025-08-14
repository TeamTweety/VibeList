import React, { useEffect, useState } from 'react';

export function Visualizer ({ isPlaying = true }) {
    const [barColors, setBarColors] = useState([]);

    useEffect(() => {
        const colorSchemes = [
            ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'],
            ['#FF3E4D', '#FF8F00', '#FFEB3B', '#4CAF50', '#2196F3', '#673AB7', '#E91E63', '#009688'],
            ['#1DB954', '#1ED760', '#19E68C', '#17D4AA', '#14C2C8', '#12B0E6', '#0F9EFF', '#0D8CFF'],
            ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
            ['#A8E6CF', '#88D8C0', '#68C9B0', '#48BB9F', '#28AC8F', '#089E7E', '#00906E', '#00825D']
        ];

        const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
        setBarColors(randomScheme);
    }, []);

    const visualizerStyle = {
        '--bar-color-1': barColors[0] || '#1DB954',
        '--bar-color-2': barColors[1] || '#1DB954',
        '--bar-color-3': barColors[2] || '#1DB954',
        '--bar-color-4': barColors[3] || '#1DB954',
        '--bar-color-5': barColors[4] || '#1DB954',
        '--bar-color-6': barColors[5] || '#1DB954',
        '--bar-color-7': barColors[6] || '#1DB954',
        '--bar-color-8': barColors[7] || '#1DB954',
    };

    return (
        <div className={`visualizer ${isPlaying ? 'active' : ''}`} style={visualizerStyle}>
            <div className="bar bar-1"></div>
            <div className="bar bar-2"></div>
            <div className="bar bar-3"></div>
            <div className="bar bar-4"></div>
            <div className="bar bar-5"></div>
            <div className="bar bar-6"></div>
            <div className="bar bar-7"></div>
            <div className="bar bar-8"></div>
        </div>
    )
}