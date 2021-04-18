import React, {useContext, useEffect} from 'react';
import {context} from './newsContext';

export default function Video({videoURL}) {
    /* console.log(videoURL) */
    const {setArticleVideoLoaded} = useContext(context);

    useEffect(() => {
        console.log('iz video komponente: ' + videoURL)
    }, []) 
    return (
        <video 
            className = "video"
            controls
            onLoadStart = {() => {
                setArticleVideoLoaded(true);
            }}
            key = {videoURL}
        >
        <source src={videoURL} /* type="video/mp4" */ />
        </video>
    )
}