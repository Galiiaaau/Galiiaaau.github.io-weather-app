const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "d0635b4aa9e4b47f01991638ca3167ae"
}

function getWeather() {
    const cityId = document.querySelector('#city').value;
    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
          .then(weather => {
                return weather.json();
          }).then(showWeather);

}

function showWeather(data) {
    console.log(data);
    document.querySelector('.package-name').textContent = data.name   ;
    document.querySelector('.price').innerHTML = Math.round(data.main.temp) + '&deg;';
    document.querySelector('.disclaimer').textContent = data.weather[0].description;
    document.querySelector('.features li').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    document.querySelector('.features').childNodes[3].innerHTML = `feels like : ${Math.round(data.main.feels_like)}` + '&deg;';
    document.querySelector('.features').childNodes[5].innerHTML = `humidity : ${data.main.humidity}` + '&#37;';
    document.querySelector('.features').childNodes[7].innerHTML = `wind speed : ${data.wind.speed} m/s`;
    currentTimezoneInMillis = data.timezone * 1000;
}

getWeather();

document.querySelector('#city').onchange = getWeather;


const secondHand = document.querySelector('.second-hand');
const minutesHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

let currentTimezoneInMillis = 0;

function getTimezonedDate() {
    let now = new Date();
    let utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
    let timezonedNow = new Date(utcNow.getTime() + currentTimezoneInMillis);
    return timezonedNow;
}

function setDate() {
    let now = getTimezonedDate();

    const seconds = now.getSeconds();
    const secondsDegress = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegress}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + 90;
    minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);