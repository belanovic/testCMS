import react, { useState, useEffect, useContext } from 'react';
import { getFrontpageNews, updateFrontpage } from './getDatabase';
import { context } from './newsContext.js';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import SearchDate from './SearchDate';
import {useToggle} from './customHooks.js'

export default function Order() {

    const [frontpageNews, setFrontpageNews] = useState('');
    const [reorderedArticles, setreorderedArticles] = useState('');
    const [arrowUp, setArrowUp] = useToggle();

    const { setShowHomepageBtn, setAllArticlesBtn, setNewArticleBtn, setShowFrontend } = useContext(context);

    const onDragEnd = (result) => {
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const articles = Object.assign([], reorderedArticles);
        const droppedArticle = articles[source.index];

        articles.splice(source.index, 1);
        articles.splice(destination.index, 0, droppedArticle);
        setreorderedArticles(articles)
    }

    const handleClickOrder = async () => {
        const idAndPositionArr = reorderedArticles.map((prom, i) => {
            const idAndPosition = {
                id: prom._id,
                newPosition: i + 1
            }
            return idAndPosition

        })
        const updatedFrontpage = await updateFrontpage(idAndPositionArr);
        updatedFrontpage.sort((a, b) => a.position - b.position).forEach((prom) => {
            if (prom.position > 0) console.log(prom.title)
        })
    }

    const handleClickArrow = (e) => {
        if(e.currentTarget.className.includes('up')) {
            e.currentTarget.classList.remove('up');
            e.currentTarget.classList.add('down');
            e.currentTarget.parentNode.nextElementSibling.classList.remove('show');
            e.currentTarget.parentNode.nextElementSibling.classList.add('hidden');
        } else {
            e.currentTarget.classList.add('up');
            e.currentTarget.classList.remove('down');
            e.currentTarget.parentNode.nextElementSibling.classList.add('show');
            e.currentTarget.parentNode.nextElementSibling.classList.remove('hidden');
        }
    }

    useEffect(() => {
        setShowHomepageBtn('inline-block');
        setAllArticlesBtn('inline-block');
        setNewArticleBtn('inline-block');
        setShowFrontend('none');
    })

    useEffect(async () => {
        const n = await getFrontpageNews();
        setFrontpageNews(n);
        setreorderedArticles(n);
    }, [])

    return (

        <div className="order">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="order-articles-dpl">
                    {(provided) => {
                        return <div ref={provided.innerRef} {...provided.droppableProps} className="order-articles">
                            {reorderedArticles && reorderedArticles.map(
                                (article, i) => <Draggable key={i} index={i} draggableId={`order-articles-item-drg${i}`}>
                                    {(provided) => {
                                        return <><div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            key={i} className="order-articles-item"
                                            
                                        >   <div className="order-articles-item-elements">
                                                <div
                                                    className="order-articles-item-number"
                                                >{i + 1}.</div>
                                                <div
                                                    className="order-articles-item-title"
                                                >{article.title}</div>
                                                <div
                                                    className="order-articles-item-edit"
                                                    onClick = {handleClickArrow}
                                                >
                                                    <i 
        
                                                        className= 'fas fa-chevron-down down' 
                                                        /* className={`fas fa-chevron-down ${arrowUp? 'up' : 'down'}`} */
                                                    ></i>
                                                    {/* <i className="fas fa-chevron-up"></i> */}
                                                </div>
                                            </div>
                                            <SearchDate
                                                reorderedArticles={reorderedArticles}
                                                setreorderedArticles={setreorderedArticles}
                                                i={i}
                                        
                                            />
                                        </div>
                                            {i === 4 && <div className="order-articles-item-space"></div>}
                                            {i === 8 && <div className="order-articles-item-space"></div>}
                                        </>
                                    }}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </div>
                    }
                    }
                </Droppable>
            </DragDropContext>
            <div className="order-send">
                <button
                    className="order-send-button"
                    onClick={handleClickOrder}
                >Uredi</button>
            </div>
        </div>

    )
}