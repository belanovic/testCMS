import React from 'react';
import Homepage from './Homepage.js';
import AllArticles from './AllArticles.js';
import Article from './Article.js';
import Delete from './Delete.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default function App() {    
    return (
        <div className = "cms">
            <Switch>
                <Route exact path = "/">
                    <Homepage />
                </Route>
                <Route path = '/allArticles'>
                    <AllArticles />
                </Route>
                <Route path = '/oneArticle/:id'>
                    <Article />
                </Route>
                <Route path = '/delete/:id'>
                    <Delete />
                </Route>
            </Switch>
            
        </div>
    )
}