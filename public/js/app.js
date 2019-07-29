// fetch('http://localhost:3000/weather?address='+encodeURIComponent('!')).then(response => {
//     response.json().then(data => {
//         if(data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data);
//         } 

//     }).catch(error => console.log(error));
// })

const formWeather = document.querySelector('form');
const search = document.querySelector('input');

formWeather.addEventListener('submit', (event) => {
    event.preventDefault();
    const valueSearch = search.value;
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(valueSearch)).then(response => {
    response.json().then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            console.log(data);
        } 

    }).catch(error => console.log(error));
})
})