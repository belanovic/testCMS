export default function time(prom) {
    const days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
    const months = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 
                    'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
    let date = new Date();
    const clock = date.toLocaleTimeString('sr-SR');
    const month = months[date.getMonth()];
    const dayWeek = days[date.getDay()];
    let dayMonth = date.getDate();
    dayMonth = dayMonth < 10? '0' + dayMonth + '.' : dayMonth + '.';
    const year = date.getFullYear() + '.';
    const obj = {
        clock,
        dayWeek,
        dayMonth,
        month,
        year
    }
    let dateString = '';
    for(let prom of arguments) {
        dateString = dateString + ' ' + obj[prom]
    }
    return dateString;
}
console.log(time('clock', 'dayWeek'));