import react, { useState, useEffect, useContext } from 'react';
import { getByDate, getFrontpageNews } from './getDatabase';
import { context } from './newsContext.js';

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

    const {setShowHomepageBtn, setAllArticlesBtn, setNewArticleBtn, setShowFrontend} = useContext(context);

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

    useEffect(async (prom) => {
        setDate((prev) => {
            const d = {
                day: day,
                month: month,
                year: year
            }
            console.log(d)
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
            <div className = "order-articles">
                {/* {newsByDate && newsByDate.map((article, i) => <div key = {i}>{article.title}</div> )} */}
                {frontpageNews && frontpageNews.map(
                    (article, i) => <div key = {i} className = "order-articles-item">{article.title}</div> 
                )}
            </div>
        </div>
    )
}