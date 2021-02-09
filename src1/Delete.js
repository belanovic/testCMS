import React, { useState, useContext, useEffect } from 'react';
import firebase from './firebase.js';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import Photo from './Photo.js';

const database = firebase.database();
const storage = firebase.storage();
const sveVesti = database.ref('sveVesti');

export default function Vest() {

    const [title, setTitle] = useState('');
    const [paragrafi, setParagrafi] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [imgName, setImgName] = useState('');

    const { id } = useParams();
    const { listaVesti, setListaVesti, listLoaded, setListLoaded } = useContext(context);

    const findSelectedNews = () => {
        const selectedNews = listaVesti.find((prom) => prom.id === id)
        setTitle(selectedNews.content.title);
        setParagrafi(selectedNews.content.paragrafi);
        setImgUrl(selectedNews.content.imgUrl);
        setImgName(selectedNews.content.imgName);
    }

    const handleClick = () => {
        sveVesti.child(id).set(null);
        const ref8 = storage.ref('images/' + imgName);
        ref8.delete().then(() => {
            alert('image deleted');
        });
    }

    useEffect(() => {
        findSelectedNews();
    }, [])

    return (
        <>
            <div className="vest">
                <h2 type='text' className="delete-title" >{title}</h2>
                <p className="delete-paragrafi">{paragrafi}</p>
                <Photo
                    imgUrl = {imgUrl}
                />
                {title !== '' && paragrafi !== '' && imgUrl !== '' ? <Link to="/listaVesti"><button className="btn" onClick={handleClick}>DELETE</button></Link> : <div></div>}
            </div>
            <Link to='/listaVesti'><button>Cancel</button></Link>
        </>
    )
}