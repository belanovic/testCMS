import React from 'react';
import {Link} from 'react-router-dom';
import AllArticles from './AllArticles.js';
import Article from './Article.js';

export default function Homepage() {
    return (
        <div className = "homepage">
                <Link to = {`/allArticles`}><div>All Articles</div></Link>
                <Link to = "/oneArticle/new"><div>New Article</div></Link>
        </div>
    )
}