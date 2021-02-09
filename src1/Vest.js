import React, { useState, useContext, useEffect } from 'react';
import firebase from './firebase.js';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import Title from './Title.js';
import Textarea from './Textarea.js';
import ChooseFile from './Choose-file.js';
import Photo from './Photo.js';

const database = firebase.database();
const sveVesti = database.ref('sveVesti');

export default function Vest() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [paragraphs, setParagraphs] = useState([]);
    const [imgUrl, setImgUrl] = useState('');
    const [imgName, setImgName] = useState('');
    const { id } = useParams();
    const { listaVesti, setListaVesti, listLoaded, setListLoaded } = useContext(context);

    function findNewLine() {
        const pasusi = text.split('\n')
        const elementsP = pasusi.map((prom, i) => <p key = {i}>{prom}</p>);
        setParagraphs(elementsP);        
    }

    const findSelectedArticle = () => {
        const selectedArticle = listaVesti.find((prom) => prom.id === id);
        if (selectedArticle === undefined) return;
        setTitle(selectedArticle.content.title);
        setText(selectedArticle.content.text);
        setImgUrl(selectedArticle.content.imgUrl);
        console.log(selectedArticle.content.imgUrl)

    }

    const handleClick = () => {
        if (title.length === 0 || text.length === 0) {
            console.log('vrati se');
            return;
        }

        const vest = {
            date: Date.now(),
            content: {
                title: title,
                text: text,
                imgUrl: imgUrl,
                imgName: imgName
            }
        }
        if (id === undefined) {
            vest.dataCreated = Date.now();
            sveVesti.push(vest);
        } else {
            sveVesti.child(id).set(vest);
        }
        
    }

    useEffect(() => {
        findSelectedArticle();
    }, [])
    useEffect(() => {
        findNewLine();
    }, [text])


    return (
        <div className = "vest-container">
            <div className="vest">
                <Title
                    title={title}
                    setTitle={setTitle}
                />
                <Textarea
                    text={text}
                    setText={setText}
                />
                <ChooseFile
                    setImgUrl={setImgUrl}
                    setImgName={setImgName}
                />
                <Photo
                    imgUrl = {imgUrl}
                />
                {title !== '' && text !== '' && imgUrl !== '' ?
                    <Link to="/listaVesti">
                        <button className="btn" onClick={handleClick}>Save</button>
                    </Link>
                    :
                    <div></div>}
            </div>
            <Link to='/listaVesti'>
                <button>Lista vesti</button>
            </Link>
            <div className = "preview">{paragraphs.map(prom => prom)}</div>
        </div>
    )
}