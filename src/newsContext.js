import React, { useState, useEffect } from 'react';

const context = React.createContext();

function Provider(props) {

    const [listAllArticles, setListAllArticles] = useState([]);
    const [listLoaded, setListLoaded] = useState(true);
    const [articleDataLoaded, setArticleDataLoaded] = useState(false);
    const [articleImgLoaded, setArticleImgLoaded] = useState(false);
    /* const [articleVideoLoaded, setArticleVideoLoaded] = useState(false); */
    const [showCmsOverlay, setShowCmsOverlay] = useState('none');

    const [showHomepageBtn, setShowHomepageBtn] = useState('none');
    const [allArticlesBtn, setAllArticlesBtn] = useState('none');
    const [newArticleBtn, setNewArticleBtn] = useState('none');
    const [showFrontend, setShowFrontend] = useState('none');
    const [formVisible, setFormVisible] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState('');

    useEffect(() => {

        setLoggedIn((prev) => {
            return localStorage.getItem('x-auth-token') === 'none'? false : true
        })
    }, [])
    useEffect(() => {

        console.log('User is logged in? ' + isLoggedIn)
        console.log('in local storage ' + localStorage.getItem('x-auth-token'))
    }, [isLoggedIn])

    return (
        <context.Provider value={{
            listAllArticles,
            setListAllArticles,
            listLoaded,
            setListLoaded,
            articleDataLoaded,
            setArticleDataLoaded,
            articleImgLoaded,
            setArticleImgLoaded,
            showCmsOverlay,
            setShowCmsOverlay,
            showHomepageBtn,
            setShowHomepageBtn,
            allArticlesBtn,
            setAllArticlesBtn,
            newArticleBtn,
            setNewArticleBtn,
            showFrontend,
            setShowFrontend,
            formVisible,
            setFormVisible,
            isLoggedIn,
            setLoggedIn,
            loggedUser,
            setLoggedUser


        }}>
            {props.children}
        </context.Provider>
    )
}

export { context, Provider };

