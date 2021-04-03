import React, {useState, useEffect} from 'react';
import firebase from './firebase.js';
import imageCompression from 'browser-image-compression';

const storage = firebase.storage();

export default function ChooseFile({ setImgURL, setImgName, currentImgName, isNewArticle }) {

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 620,
        useWebWorker: true
      }

    const [changeImgCounter, setChangeImgCounter] = useState(0);

    async function uploadHandler (e) {

        const promiseResolveA = await setChangeImgCounter(prev => prev + 1);
        console.log(isNewArticle)
        let file = e.target.files[0];
        if (file === undefined) return;
        const fileName = Date.now() + '_' + file.name;
        const compressedFile = await imageCompression(file, options);
      /*   console.log(file.size/1024 + ' KB');
        console.log(compressedFile.size/1024 + ' KB'); */
        file = compressedFile;
        const ref8 = storage.ref('site-news-images/' + fileName);

        /* if (!isNewArticle && changeImgCounter > 0) {
            const currentImgRef = storage.ref('site-news-images/' + currentImgName);
            const deletedImage = await currentImgRef.delete();
        }  */
        const snapshot = await ref8.put(file);
        const photoURL = await ref8.getDownloadURL();
        setImgURL(photoURL);
        setImgName(fileName);
    }

    useEffect(() => {
        console.log(changeImgCounter);
    }, [changeImgCounter])

       useEffect(() => {
        console.log(isNewArticle);
    }, [])

    return (
        <input
            type="file"
            onChange={uploadHandler}>
        </input>
    )
}