import React, {useState, useEffect} from 'react';

const context = React.createContext();

function Provider(props) {

    const [listAllArticles, setListAllArticles] = useState([]);
    const [listLoaded, setListLoaded] = useState(true);
    const [articleDataLoaded, setArticleDataLoaded] = useState(false);
    const [articleImgLoaded, setArticleImgLoaded] = useState(false);

    useEffect(() => {
    }, [listLoaded])

    return (
        <context.Provider value = {{
            listAllArticles,
            setListAllArticles,
            listLoaded,
            setListLoaded,
            articleDataLoaded,
            setArticleDataLoaded,
            articleImgLoaded,
            setArticleImgLoaded
        }}>
            {props.children}
        </context.Provider>
    )
}

export {context, Provider};