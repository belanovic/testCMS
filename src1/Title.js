import React from 'react';

export default function Title({title, setTitle}) {

    const handleChangeTitle = (e) => {
        const value = e.target.value;
        setTitle(value);
    }

    return (
        <input
            type = 'text'
            name = "title"
            className = "title"
            value = {title}
            onChange = {handleChangeTitle}
            placeholder = {'Enter title'}
        >
        </input>
    )
}