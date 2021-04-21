import React, { useState, useEffect } from 'react';

const context = React.createContext();

function Provider(props) {

    const [listAllArticles, setListAllArticles] = useState([]);
    const [listLoaded, setListLoaded] = useState(true);
    const [articleDataLoaded, setArticleDataLoaded] = useState(false);
    const [articleImgLoaded, setArticleImgLoaded] = useState(false);
    const [articleVideoLoaded, setArticleVideoLoaded] = useState(false);
    const [showCmsOverlay, setShowCmsOverlay] = useState('none');

    const [showHomepageBtn, setShowHomepageBtn] = useState('none');
    const [allArticlesBtn, setAllArticlesBtn] = useState('none');
    const [newArticleBtn, setNewArticleBtn] = useState('none');
    const [showFrontend, setShowFrontend] = useState('none');

    useEffect(() => {
    }, [listLoaded])

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
            articleVideoLoaded,
            setArticleVideoLoaded,
            showCmsOverlay,
            setShowCmsOverlay,
            showHomepageBtn, 
            setShowHomepageBtn,
            allArticlesBtn,
            setAllArticlesBtn,
            newArticleBtn, 
            setNewArticleBtn,
            showFrontend,
            setShowFrontend
        }}>
            {props.children}
        </context.Provider>
    )
}

export { context, Provider };