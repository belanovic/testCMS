import React from 'react';

export default function Time({ lastUpdate }) {
    return (
        <div className="time">
            <p className="lastUpdate">{new Date(lastUpdate).toLocaleTimeString('sr-RS')}</p>
            <p className="lastUpdate">{new Date(lastUpdate).toLocaleDateString('sr-RS')}</p>
        </div>
    )
}