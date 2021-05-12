import React, { useState, useRef, useContext, useEffect } from 'react';
import Header from './Header';
import Homepage from './Homepage.js';
import AllArticles from './AllArticles.js';
import Article from './Article.js';
import Delete from './Delete.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { context } from './newsContext';
import Footer from './Footer';
import Form from './Form.js';
import Order from './Order.js';

export default function App() {
    const cmsOverlay = useRef(null);
    const { showCmsOverlay, setShowCmsOverlay, isLoggedIn } = useContext(context);

    return (<>
        {isLoggedIn ?
            <div className="cms" /* style = {{height: window.innerHeight + 'px'}} */>

                <div className="cmsOverlay" ref={cmsOverlay} style={{ display: showCmsOverlay }}></div>
                <Header showHomepageBtn={false} showFrontend={false} allArticlesBtn={false} newArticleBtn={false} />
                <Switch>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Route path="/form"><Form /></Route>
                    <Route path="/order"><Order /></Route>
                    <Route path='/allArticles'>
                        <AllArticles />
                    </Route>
                    <Route path='/oneArticle/:id'>
                        <Article setShowCmsOverlay={setShowCmsOverlay} />
                    </Route>
                    <Route path='/delete/:id'>
                        <Delete />
                    </Route>
                </Switch>
                <Footer />
            </div>
            :
            <Form />
        }
    </>
    )
}