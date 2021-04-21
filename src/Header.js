import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { context } from './newsContext.js';

export default function Header() {

    const { showHomepageBtn, allArticlesBtn, newArticleBtn, showFrontend } = useContext(context);

    return (
        <header className="header">

            <div className="header-links">
                <div className="header-links-frontend" style = {{display: showFrontend}} >
                    <a href = 'https://site-news-frontend.netlify.app/' target = "_blanc">
                        <div className="header-links-frontend-title">
                            <i className="fab fa-react"></i>
                            <span>Vesti</span>
                        </div>
                    </a>
                </div>
                <div
                    className="header-homepageBtn"
                    style={{ display: showHomepageBtn }}
                >
                    <Link to="/">
                        <div
                            className="header-homepageBtn-text"
                        >Homepage</div>
                    </Link>
                </div>

                <div
                    className="header-allArticlesBtn"
                    style={{ display: allArticlesBtn }}
                >
                    <Link to={`/allArticles`}>
                        <div
                            className="header-allArticlesBtn-text"
                        >All articles</div>
                    </Link>
                </div>

            </div>

            <div className="header-title">
                <Link to="/">
                        <div
                            className="header-title-text"
                        >CMS</div>
                </Link>
            </div>

            <div className = "right-box">
                <div
                    className="header-newArticleBtn"
                    style={{ display: newArticleBtn }}
                >
                    <Link to="/oneArticle/new">
                        <div
                            className="header-newArticleBtn-text"
                        >New article</div>
                    </Link>
                </div>
                <div className="login">
                    <i class="fas fa-user-edit"></i>
                </div>
            </div>

        </header>
    )
}