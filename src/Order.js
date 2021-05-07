import react, { useState, useEffect } from 'react';
import { getByDate } from './getDatabase';

export default function Order() {
    const [newsByDate, setNewsByDate] = useState([]);
    const [date, setDate] = useState({});
    const [day, setDay] = useState(new Date().getDate());
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        if(name === 'day') {
            setDay(value);
            return;
        }
        if(name === 'month') {
            setMonth(value);
            return
        }
        if(name === 'year') {
            setYear(value);
            return
        }
    }

    useEffect(async (prom) => {
        const result = await getByDate();
        setNewsByDate(result);
    })
    return (
        <div className="order">
            <div className="date">
                <div className="dateElement">
                    <label htmlFor="dateInput">Dan</label>
                    <input 
                        type="number" 
                        name = "day"                        
                        id="dateInput"
                        className="dateInput"
                        value = {day}
                        onChange = {handleChange}
                    ></input>
                </div>
                <div className="dateElement">
                    <label htmlFor="dateInput">Mesec</label>
                    <input 
                        type="number"
                        name = "month"
                        id="dateInput" 
                        className="dateInput"
                        value = {month}
                        onChange = {handleChange}
                    ></input>
                </div>
                <div className="dateElement">
                    <label htmlFor="dateInput">Godina</label>
                    <input 
                        type="number" 
                        name = "year"
                        id="dateInput" 
                        className="dateInput year"
                        value = {year}
                        onChange = {handleChange}
                    ></input>
                </div>
            </div>
        </div>
    )
}