import React, { useEffect, useState, useContext } from 'react';
import {getAllArticles} from './getDatabase.js';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import Pagination from './Pagination.js';
import Time from './Time.js';

import ChooseFile from './Choose-file.js';
import Photo from './Photo';

const NEWS_PER_PAGE = 10;



export default function AllArticles() {

    const {listAllArticles, setListAllArticles, listLoaded, setListLoaded } = useContext(context);
    const [pageNum, setPageNum] = useState(1);
    const [imgName, setImgName] = useState('');

    useEffect(async function () {
        const allNews = await getAllArticles();
        const promiseResolveA = await setListAllArticles(allNews);
        const promiseResolveB = await setListLoaded(true);

        return () => setListLoaded(false);
    }, [])

    return (
        <> <Link to = "/oneArticle/new" style={{ textDecoration: 'none' }}><div className = "novaVest">Nova vest</div></Link> 
           <Link to = "/" style={{ textDecoration: 'none' }}><div className = "homepageBtn">Homepage</div></Link>
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
                        />
                        <Link to={`/delete/${oneArticle._id}`}>
                            <button>Delete</button>
                        </Link>
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