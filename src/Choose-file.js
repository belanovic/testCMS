import React, {useState} from 'react';
import firebase from './firebase.js';

const database = firebase.database();
const storage = firebase.storage();

export default function ChooseFile({ setImgURL, setImgName, currentImgName, isNewArticle }) {

    const [changeImgCounter, setChangeImgCounter] = useState(0);
    async function uploadHandler (e) {
        const file = e.target.files[0];
        const fileName = Date.now() + '_' + file.name;
        if (file === undefined) return;
        const ref8 = storage.ref('site-news-images/' + fileName);
        if (!isNewArticle && changeImgCounter > 0) {
            const currentImgRef = await storage.ref('site-news-images/' + currentImgName);
            const deletedImage = await currentImgRef.delete();
            setChangeImgCounter(prev => prev + 1);
        } 
        const snapshot = await ref8.put(file);
        const photoURL = await ref8.getDownloadURL();
        setImgURL(photoURL);
        setImgName(fileName);
    }

    return (
        <input
            type="file"
            onChange={uploadHandler}>
        </input>
    )
}