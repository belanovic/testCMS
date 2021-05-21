import react, { useState, useEffect, useContext } from 'react';
import { getByDate } from './getDatabase';
import { context } from './newsContext';

const years = [];
for (let i = 2020; i <= new Date().getFullYear(); i++) {
    years.push(i);
}

export default function SearchDate({reorderedArticles, setreorderedArticles, i}) {
    const [newsByDate, setNewsByDate] = useState([]);
    const [date, setDate] = useState({});
    const [day, setDay] = useState(new Date().getDate());
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedArticle, setSelectedArticle] = useState('');


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

    const handleSelectArticle = (e) => {
        const value = e.target.value;
        setSelectedArticle(value);
    }

    const handleSave = (e) => {
       
        let newOrder = Object.assign([], reorderedArticles);
        newOrder[i] = newsByDate[selectedArticle];
        console.log(newOrder);
        setreorderedArticles(newOrder);

        e.currentTarget.parentNode.classList.remove('show')
        e.currentTarget.parentNode.classList.add('hidden');
        e.currentTarget.parentNode.previousElementSibling.lastElementChild.classList.remove('up')
        e.currentTarget.parentNode.previousElementSibling.lastElementChild.classList.add('down')
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

    return (
        <div className="order-date hidden">
            <div className="order-dateElement">
                {/* <label htmlFor="dateInput">Dan</label> */}
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
            <select
                className="order-selected-articles"
                value={selectedArticle}
                onChange={handleSelectArticle}
            >
                {newsByDate.map((prom, i) => {
                    return <option key={i} value={i}>
                        {prom.title}
                    </option>
                }
                )}
            </select>
            <div className="order-date-save" onClick={handleSave}>
                <button onClick = {handleSave}>Sačuvaj izmenu</button>
            </div>
        </div>

    )
}