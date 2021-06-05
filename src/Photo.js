import React, { useContext } from 'react';
import { context } from './newsContext';
import ImgCropper from './ImgCropper.js';

export default function Photo({ imgURL, setImgURL, setImgName, setImgFile,
    tabPhotoVisibility, imgDescription, inputHandler }) {

    const { articleImgLoaded, setArticleImgLoaded } = useContext(context);

    return (
        <div className="article-photo" style={{ display: tabPhotoVisibility }}>
            <div className="imgDescription">
                <label htmlFor="imgDescription">Opis fotografije</label>
                <input
                    id="imgDescription"
                    name="imgDescription"
                    type="text"
                    value={imgDescription}
                    onChange={inputHandler}
                ></input>
            </div>

            <div className="article-photo-container">
                <div>
                    <img
                        className="article-photo-img"
                        src={imgURL}
                        alt="fotka"
                        onLoad={() => {
                            setArticleImgLoaded(true);
                        }}
                    >
                    </img>
                </div>
                <ImgCropper
                    setImgURL={setImgURL}
                    setImgFile={setImgFile}
                    setImgName={setImgName}
                />
            </div>
        </div>
    )
}