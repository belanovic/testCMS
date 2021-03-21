import React from 'react';
import dateFormat from './dateFormat.js';

/* const formatDate = (d) => {
    const time = new Date(d).toLocaleTimeString('rs-RS', { hour12: false });
    const date = new Date(d).toLocaleDateString('rs-RS', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return date + ' ' + time
} */

export default function Time({ timeCreated, timeUpdated, timePublished, published }) {
    return (
        <div className="time">
            <p className="lastUpdate">
                Last update: {dateFormat(timeUpdated, 'month', 'dayMonth', 'year', 'comma', 'clock')}
            </p>
            <p className="dateCreated">
                Date created: {dateFormat(timeCreated, 'month', 'dayMonth', 'year', 'comma', 'clock')}
            </p>
            <p className="datePublished">
                {published? `Date published: ${dateFormat(timePublished, 'month', 'dayMonth', 'year', 'comma', 'clock')}` : 'Not published'}
            </p>
        </div>
    )
}