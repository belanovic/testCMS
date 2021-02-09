import React from 'react';
import firebase from './firebase.js';

const database = firebase.database();
const storage = firebase.storage();

export default function ChooseFile({setImgUrl, setImgName}) {

    const uploadHandler = (e) => {
        const file = e.target.files[0];
        const vreme = Date.now();
        const fileName = vreme + file.name;
        if (file === undefined) return;
        const ref8 = storage.ref('images/' + fileName);
        ref8.put(file).then((prom) => {
            ref8.getDownloadURL().then((prom) => {
                setImgUrl(prom);
                setImgName(fileName)
            })
        });
    }

    return (
        <input
            type = "file"
            onChange = {uploadHandler}>
        </input>
    )
}