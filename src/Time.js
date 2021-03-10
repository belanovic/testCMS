import React from 'react';

const formatDate = (d) => {
    const time = new Date(d).toLocaleTimeString('rs-RS', { hour12: false });
    const date = new Date(d).toLocaleDateString('rs-RS', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return date + ' ' + time
}

export default function Time({ timeCreated, timeUpdated, timePublished }) {
    return (
        <div className="time">
            <p className="lastUpdate">
                Last update: {formatDate(timeUpdated)}
            </p>
            <p className="dateCreated">
                Date created: {formatDate(timeCreated)}
            </p>
            <p className="datePublished">
                Date published: {formatDate(timePublished)}
            </p>
        </div>
    )
}