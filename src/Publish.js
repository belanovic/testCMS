import React, { useContext, useEffect } from 'react';
import {publishArticle, getAllArticles} from './getDatabase.js';
import { context } from './newsContext';

export default function Publish({ id }) {
    const {listAllArticles, setListAllArticles, setListLoaded} = useContext(context);
    async function handleClick(e) {
       try {
           const publishedArticle = await publishArticle(id);
           const allNews = await getAllArticles();
           const promiseResolveA = await setListAllArticles(allNews);
           const promiseResolveB = await setListLoaded(true);
           return publishedArticle
       } catch(err) {
           console.log(err)
       }
    }

    return (
        <div className="publish">
            <button onClick = {handleClick}>Publish</button>
        </div>
    )
}