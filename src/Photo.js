import React, {useContext} from 'react';
import {context} from './newsContext';
import ChooseImage from './ChooseImage.js';

export default function Photo({imgURL, setImgURL, setImgName, setImgFile}) {
    const {articleImgLoaded, setArticleImgLoaded} = useContext(context);
    return (
        <div className = "img-container">
        <img
            className = "img"
            src={imgURL}
            alt="fotka"
            onLoad = {() => {
                setArticleImgLoaded(true);
            }}
        >
        </img>
        <ChooseImage  
                 setImgURL={setImgURL}
                 setImgName={setImgName}
                 setImgFile = {setImgFile}
        />
        </div>
    )
}