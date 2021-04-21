import React, {useState, useRef, useContext, useEffect} from 'react';
import Header from './Header';
import Homepage from './Homepage.js';
import AllArticles from './AllArticles.js';
import Article from './Article.js';
import Delete from './Delete.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {context} from './newsContext';
import Footer from './Footer';

export default function App() {
    const cmsOverlay = useRef(null);
    const {showCmsOverlay, setShowCmsOverlay} = useContext(context);

    return (
        <div className = "cms">
            <div className = "cmsOverlay" ref = {cmsOverlay} style = {{display: showCmsOverlay}}></div>
            <Header />
            <Switch>
                <Route exact path = "/">
                    <Homepage />
                </Route>
                <Route path = '/allArticles'>
                    <AllArticles />
                </Route>
                <Route path = '/oneArticle/:id'>
                    <Article setShowCmsOverlay = {setShowCmsOverlay} />
                </Route>
                <Route path = '/delete/:id'>
                    <Delete />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}