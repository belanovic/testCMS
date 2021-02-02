import React, {useContext} from 'react';
import {context} from './newsContext';

export default function Photo({imgURL}) {
    const {articleImgLoaded, setArticleImgLoaded} = useContext(context);
    return (
        <img
            src={imgURL}
            alt="fotka"
            onLoad = {() => {
                setArticleImgLoaded(true);
            }}
        >
        </img>
    )
}