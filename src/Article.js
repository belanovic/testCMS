import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import {getArticle,getAllArticles, postArticle, updateArticle, getFrontpageNews, updateArticlePosition} from './getDatabase.js';
import Title from './Title.js';
import Subtitle from './Subtitle.js';
import Textarea from './Textarea.js';
import ChooseFile from './Choose-file.js';
import Photo from './Photo.js';

export default function Article({setShowCmsOverlay}) {
    const [frontpageNews, setFrontpageNews] = useState('');
    const [published, setPublished] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [IdArticleToChangePosition, setIdArticleToChangePosition] = useState('');
    const [position, setPosition] = useState(0);
    const [category, setCategory] = useState('politics');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [paragraphs, setParagraphs] = useState([]);
    const [imgURL, setImgURL] = useState('');
    const [imgName, setImgName] = useState('');
    const { id } = useParams();
    const [isNewArticle, setIsNewArticle] = useState(true);
    const { listAllArticles, setListAllArticles,
            listLoaded, setListLoaded,
            articleImgLoaded, setArticleImgLoaded,
            articleDataLoaded, setArticleDataLoaded
        } = useContext(context);

    let contentLoaded = articleDataLoaded === true && articleImgLoaded === true;
    let showPosition = published === true? 'inline' : 'none';

    function findNewLine() {
        const pasusi = text.split('\n')
        const elementsP = pasusi.map((prom, i) => <p key = {i}>{prom}</p>);
        setParagraphs(elementsP);
    }

    async function findSelectedArticle () {
        if (id === 'new') {
            setIsNewArticle(true);
            setArticleDataLoaded(true);
            setArticleImgLoaded(true);
            return
        }
        const response = await getArticle(id);
        const selectedArticle = await response.json();
        setIsNewArticle(false);
        setTitle(selectedArticle.title);
        setSubtitle(selectedArticle.subtitle);
        setText(selectedArticle.text);
        setImgURL(selectedArticle.imgURL);
        setImgName(selectedArticle.imgName);
        setCategory(selectedArticle.category);
        setPosition(selectedArticle.position);
        setCurrentPosition(selectedArticle.position);
        setPublished(selectedArticle.published);
        setArticleDataLoaded(true);
    }
    async function handleSave() {
        if (title.length === 0 || text.length === 0) {
            return;
        }
        setShowCmsOverlay('block');
        const vest = {
                id: id,
                category: category,
                published: published,
                position: position,
                title: title,
                subtitle: subtitle,
                text: text,
                imgURL: imgURL, 
                imgName: imgName
        }
        if (id === 'new') {
            try{
                vest.dateCreated = Date();
                vest.dateUpdated = Date();
                if (published) {
                    vest.datePublished = Date();
                 }
                let response = await postArticle(vest);
                console.log(response);
                let deployedArticle = await response.text(response);
                const allNews = await getAllArticles();
                const promiseResolveA = await setListAllArticles(allNews);
                const promiseResolveB = await setListLoaded(true);
                setShowCmsOverlay('block');
                window.location.href = '/allArticles';
                return deployedArticle
            } catch(err) {
                console.log(err);
            }
            
        } else {
            try {
                vest.dateUpdated = Date();
                if (published) {
                    vest.datePublished = Date()
                }
                let response = await updateArticle(vest);
                let updatedArticle = await response.json();
                console.log(updatedArticle)
                if(IdArticleToChangePosition !== '') {
                    let response = await updateArticlePosition(IdArticleToChangePosition, currentPosition);
                    let changedPositionArticle = response.json();
                }
                const allNews = await getAllArticles();
                const promiseResolveA = await setListAllArticles(allNews);
                const promiseResolveB = await setListLoaded(true);
                setShowCmsOverlay('block');
                window.location.href = '/allArticles';
                return updatedArticle
            } catch(err) {
                console.log(err);
            }
        }
    }

    const handleSelect = (e) => {
        const option = e.target.value;
        console.log(option);
        setCategory(option);
    }

    const handleNumber = (e) => {
          if (published === false) {
            setPosition(0);
            return
          }
          const numInput = parseInt(e.target.value);
          if (numInput > 10 || numInput < 0) return;
          setPosition(numInput);
          const articleWithSamePosition = frontpageNews.find((prom) => {
              return prom.position === numInput
          })
          console.log(articleWithSamePosition);
          if (articleWithSamePosition === undefined) return;
          setIdArticleToChangePosition(articleWithSamePosition._id);
    }

    const handleCheck = (e) => {
        const v = e.target.checked;
        setPublished(v);
        if(v === false) {
            setPosition(0)
        }
    }

    useEffect(() => {
        findSelectedArticle();
        return () => {
            setArticleImgLoaded(false);
            setArticleDataLoaded(false);
        }
    }, [])
    useEffect(() => {
        findNewLine();
    }, [text])

    useEffect(async () => {
        const n = await getFrontpageNews();
        /* n.forEach((prom) => {
            console.log(prom.position + ' ' + prom.title);
        }) */
        setFrontpageNews(n);
    }, [])


    return (
        <div className = "article">
            
            <div className="article-parts" style = {{
                display: contentLoaded? 'block' : 'none'
            }}>
                <input 
                    type = "number" 
                    min = "0" 
                    max = "10" 
                    onChange = {handleNumber} 
                    value = {position}
                    style = {{display: showPosition}}
                ></input>
                <select className = "categories" value = {category} onChange = {handleSelect}>
                    <option value = "politics">Politics</option>
                    <option value = "business">Business</option>
                    <option value = "technology">Technology</option>
                    <option value = "entertainment">Entertainment</option>
                    <option value = "sports">Sports</option>
                </select>
                <Title
                    title={title}
                    setTitle={setTitle}
                />
                <Subtitle 
                    subtitle={subtitle}
                    setSubtitle={setSubtitle}
                />
                <Textarea
                    text={text}
                    setText={setText}
                />
                <ChooseFile
                    setImgURL={setImgURL}
                    setImgName={setImgName}
                    currentImgName={imgName}
                    isNewArticle={isNewArticle}
                />
                <Photo
                    imgURL = {imgURL}
                />
                {title !== '' && text !== '' && imgURL !== '' ?
                    <div>
                        <button className="btn" onClick={handleSave}>Save</button>

                        <label htmlFor = "publishCheckbox">Objavljeno</label>
                        <input 
                            id = "publishCheckbox" 
                            name = "publishCheckbox" 
                            type = "checkbox" 
                            className = "publishCheckbox"
                            checked = {published}
                            onChange = {handleCheck}
                        ></input>
                    </div>

                    :
                    <div></div>}
            </div>
           
            <div className = "loadingArticle" style = {{
                display: contentLoaded === true || isNewArticle === true? 'none' : 'block',
                fontSize: '5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>Loading...</div> 
            
            <Link to= {`/allArticles`}>
                <button>Nazad na listu vesti</button>
            </Link>
            <div className = "preview">{paragraphs.map(prom => prom)}</div>
            <Link to = "/" style={{ textDecoration: 'none' }}><div className = "homepageBtn">Homepage</div></Link>
        </div>
    )
}