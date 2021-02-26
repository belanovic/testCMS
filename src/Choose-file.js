import React, {useState} from 'react';
import firebase from './firebase.js';
import imageCompression from 'browser-image-compression';


const database = firebase.database();
const storage = firebase.storage();

export default function ChooseFile({ setImgURL, setImgName, currentImgName, isNewArticle }) {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 620,
        useWebWorker: true
      }
    const [changeImgCounter, setChangeImgCounter] = useState(0);
    async function uploadHandler (e) {
        let file = e.target.files[0];
        if (file === undefined) return;
        const fileName = Date.now() + '_' + file.name;
        const compressedFile = await imageCompression(file, options);
        console.log(file.size/1024 + ' KB');
        console.log(compressedFile.size/1024 + ' KB');
        file = compressedFile;
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