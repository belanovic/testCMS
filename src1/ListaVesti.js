import React, { useState, useEffect, useContext } from 'react';
import getNews from './getNews';
import { context } from './newsContext.js';
import { Link } from 'react-router-dom';
import Pagination from './Pagination.js';
import Time from './Time.js';

const NEWS_PER_PAGE = 10;

export default function ListaVesti() {

    const [pageNum, setPageNum] = useState(1);
    const { listaVesti, setListaVesti, listLoaded, setListLoaded } = useContext(context);

    useEffect(() => {
        getNews(setListaVesti);
        return function () {
            setListLoaded(false);
        }
    }, [])

    return (
        <>
            <Link to="/vest"><button className="novaVest">Nova vest</button></Link>
            {listLoaded === true ?
                <div className="listaVesti">
                    {listaVesti.map((prom, i) => {
                        return ((i + 1) <= pageNum * NEWS_PER_PAGE && (i + 1) > pageNum * NEWS_PER_PAGE - NEWS_PER_PAGE) &&
                            <li className="item" key={prom.id}>
                                <span >{i + 1}</span>
                                <Link to={`/vest/${prom.id}`}>
                                    <h2>{prom.content.title}</h2>
                                </Link>
                                <Time lastUpdate = {prom.date}/>
                                <Link to={`/delete/${prom.id}`}>
                                    <h3 className = "delete">DELETE</h3>
                                </Link>
                            </li>
                    })}
                    <Pagination
                        isLastPage={pageNum * NEWS_PER_PAGE >= listaVesti.length ? true : false}
                        NEWS_PER_PAGE={NEWS_PER_PAGE}
                        pageNum={pageNum}
                        setPageNum={setPageNum} 
                    />
                </div>
                :
                <div className="listaVesti loading">Loading...</div>}
                <button onClick = {(e) => console.log(Date.now())}>Milisekunde</button>
        </>
    )
}