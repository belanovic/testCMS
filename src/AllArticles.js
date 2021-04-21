import React, { useEffect, useState, useContext } from 'react';
import {getAllArticles} from './getDatabase.js';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import Pagination from './Pagination.js';
import Time from './Time.js';
import Publish from './Publish.js';

const NEWS_PER_PAGE = 10;

export default function AllArticles() { 

    const {listAllArticles, setListAllArticles, listLoaded, setListLoaded,
          setShowHomepageBtn, setAllArticlesBtn, setNewArticleBtn, setShowFrontend} = useContext(context);
    const [pageNum, setPageNum] = useState(1);
    const [imgName, setImgName] = useState('');

    useEffect(async function () {
        const allNews = await getAllArticles();
        const promiseResolveA = await setListAllArticles(allNews);
        const promiseResolveB = await setListLoaded(true);

        setShowHomepageBtn('inline-block');
        setAllArticlesBtn('none');
        setNewArticleBtn('inline-block');
        setShowFrontend('none');

        return () => setListLoaded(false);
    }, [])


    return (
        <>
         {listLoaded === true ?
            <div className="allArticles">
                {listAllArticles.map((oneArticle, i) => {
                    return ((i + 1) <= pageNum * NEWS_PER_PAGE && (i + 1) > pageNum * NEWS_PER_PAGE - NEWS_PER_PAGE) && <div key={i}>
                        <Link to={`/oneArticle/${oneArticle._id}`}>
                            <h2>{oneArticle.title}</h2>
                        </Link>
                        <Time 
                            timeCreated = {oneArticle.dateCreated} 
                            timeUpdated = {oneArticle.dateUpdated}
                            timePublished = {oneArticle.datePublished}
                            published = {oneArticle.published}
                        />
                        {!oneArticle.published && <Link to={`/delete/${oneArticle._id}`}>
                            <button>Delete</button>
                        </Link>}
                        {!oneArticle.published && <Publish id = {oneArticle._id} />}
                    </div>
                })}
            </div>
            :
            <div className="listaVesti loading" style = {{
                fontSize: '5rem',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>Loading...</div>}
            <Pagination
                isLastPage={pageNum * NEWS_PER_PAGE >= listAllArticles.length ? true : false}
                NEWS_PER_PAGE={NEWS_PER_PAGE}
                pageNum={pageNum}
                setPageNum={setPageNum}
            />
        </>
    )
}