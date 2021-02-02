import React from 'react';

export default function Subtitle({subtitle, setSubtitle}) {

    function handleChangeSubtitle(e) {
        const value = e.target.value;
        setSubtitle(value);
    }

    return (
        <input
            type = 'text'
            name = "subtitle"
            className = "subtitle"
            value = {subtitle}
            onChange = {handleChangeSubtitle}
            placeholder = {'Enter subtitle'}
        >
        </input>
    )
}