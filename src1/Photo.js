import React from 'react';

export default function Photo({imgUrl}) {
    return (
        <img
            src={imgUrl}
            alt="fotka"
        >
        </img>
    )
}