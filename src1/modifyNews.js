import firebase from './firebase.js';

const database = firebase.database();
const sveVesti = database.ref('sveVesti');
const path = database.ref('path');

export default function modifyNews() {
  sveVesti.once('value', (d) => {
      const data = d.val();
      console.log(data)
      for (let prom in data) {
          /* data[prom].id = prom; */
          /* data[prom].date = Date.now(); */
          /* arr.push(data[prom]); */
          /* obj[prom] = data[prom]; */
          const obj = {ime: 'Goran'};
          path.child(`/${prom}/content/paragrafi`).set(obj);
        }
      
      
  })
}