import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import {deleteArticle} from './getDatabase.js';
import Title from './Title.js';
import Subtitle from './Subtitle.js';
import Textarea from './Textarea.js';
import Photo from './Photo.js';

export default function Delete() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [imgURL, setImgURL] = useState('');
    const { id } = useParams();
    const {listAllArticles, setListAllArticles,
        listLoaded, setListLoaded,
        articleImgLoaded, setArticleImgLoaded,
        articleDataLoaded, setArticleDataLoaded
    } = useContext(context);

    let contentLoaded = articleDataLoaded === true && articleImgLoaded === true;

    const findSelectedArticle = () => {
        const selectedArticle = listAllArticles.find((prom) => prom._id === id);
        setTitle(selectedArticle.title);
        setSubtitle(selectedArticle.subtitle);
        setText(selectedArticle.text);
        setImgURL(selectedArticle.imgURL);
        setArticleDataLoaded(true);
    }

    const handleDelete = () => {
        deleteArticle(id)
            .then((prom) => {
                console.log('evo me')
                setListLoaded(true);
                return ''
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        findSelectedArticle();
        return () => {
            setArticleImgLoaded(false);
            setArticleDataLoaded(false);
        }
    }, [])

    return (
        <div className = "delete">
            <div className="delete-parts" style = {{
                display: contentLoaded? 'block' : 'none'
            }}>
                <h1 className = "deleteTitle">{title}</h1>
                <h3 className = "deleteSubtitle">{subtitle}</h3>
                <div className = "deleteText">{text}</div>
                <Photo
                    imgURL = {imgURL}
                />
                {title !== '' && text !== '' && imgURL !== '' ?
                    <Link to="/allArticles">
                        <button className="btn" onClick={handleDelete}>Delete</button>
                    </Link>
                    :
                    <div></div>}
            </div>
            <div className = "loadingArticle" style = {{
                display: contentLoaded === true? 'none' : 'block',
                fontSize: '5rem',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>Loading...</div> 
            <Link to='/allArticles'>
                <button>Lista vesti</button>
            </Link>
            <Link to = "/" style={{ textDecoration: 'none' }}><div className = "homepageBtn">Homepage</div></Link>
        </div>
    )
}