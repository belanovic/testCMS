import react, { useState, useEffect, useContext } from 'react';
import { getByDate, getFrontpageNews, updateFrontpage } from './getDatabase';
import { context } from './newsContext.js';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const years = [];
for (let i = 2020; i <= new Date().getFullYear(); i++) {
    years.push(i);
}

export default function Order() {
    const [newsByDate, setNewsByDate] = useState([]);
    const [date, setDate] = useState({});
    const [day, setDay] = useState(new Date().getDate());
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [frontpageNews, setFrontpageNews] = useState('');
    const [reorderedArticles, setreorderedArticles] = useState('');

    const { setShowHomepageBtn, setAllArticlesBtn, setNewArticleBtn, setShowFrontend } = useContext(context);

    const handleChange = (e) => {
        let value = e.target.value;
        if (value === '') {
            setDay(value);
            return
        }
        if (value < 1 || value > 31) return;
        let arrValue = value.toString().split('');
        if (arrValue[0] === '0') {
            arrValue.shift();
            value = arrValue.join('');
        }
        setDay(parseInt(value));
        return;
    }

    const handleSelect = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if (name === 'month') {
            setMonth(parseInt(value));
            return
        }
        if (name === 'year') {
            setYear(parseInt(value));
            return
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const result = await getByDate(date);
        setNewsByDate(result);
        console.log(result)
    }

    const onDragEnd = (result) => {
        const { destination, source, reason } = result;
        // Not a thing to do...
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
        console.log(updatedFrontpage)
      }

    useEffect(async (prom) => {
        setDate((prev) => {
            const d = {
                day: day,
                month: month,
                year: year
            }
            return d;
        })
    }, [day, month, year])

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
            <div className="order-date">
                <div className="order-dateElement">
                    <label htmlFor="dateInput">Dan</label>
                    <input
                        type="number"
                        name="day"
                        id="dateInput"
                        className="dateInput"
                        value={day}
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="order-dateElement">
                    <select onChange={handleSelect} value={month} name="month">
                        <option className="month-option" value="0">Januar</option>
                        <option className="month-option" value="1">Februar</option>
                        <option className="month-option" value="2">Mart</option>
                        <option className="month-option" value="3">April</option>
                        <option className="month-option" value="4">Maj</option>
                        <option className="month-option" value="5">Jun</option>
                        <option className="month-option" value="6">Jul</option>
                        <option className="month-option" value="7">Avgust</option>
                        <option className="month-option" value="8">Septembar</option>
                        <option className="month-option" value="9">Oktobar</option>
                        <option className="month-option" value="10">Novembar</option>
                        <option className="month-option" value="11">Decembar</option>
                    </select>
                </div>
                <div className="order-dateElement">
                    <select onChange={handleSelect} value={year} name="year">
                        {years.map((prom, i) => <option className="year-option" key={i} value={prom}>{prom}</option>)}
                    </select>
                </div>
                <div className="order-dateElement">
                    <button className="order-dateBtn" onClick={handleClick}>Prikaži</button>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="order-articles-dpl">
                    {(provided) => {
                        return <div ref={provided.innerRef} {...provided.droppableProps} className="order-articles">
                            {reorderedArticles && reorderedArticles.map(
                                (article, i) => <Draggable key={i} index={i} draggableId={`order-articles-item-drg${i}`}>
                                    {(provided) => {
                                        return <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            key={i} className="order-articles-item"
                                        >
                                            {article.title}
                                        </div>
                                    }}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </div>
                    }
                    }
                </Droppable>
            </DragDropContext>
            <div className = "order-send">
                <button 
                    className = "order-send-button"
                    onClick = {handleClickOrder}
                >Uredi</button>
            </div>
        </div>

    )
}