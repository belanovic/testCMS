import firebase from './firebase.js';

const database = firebase.database();
const sveVesti = database.ref('sveVesti');

export default function getNews(setListaVesti) {
    const arr = [];
    sveVesti.once('value', (d) => {
        const data = d.val();
        for (let prom in data) {
            data[prom].id = prom;
            arr.push(data[prom]);
        }
        const sortedArr = arr.sort((a, b) => b.date - a.date);
        setListaVesti(sortedArr);
    })
}