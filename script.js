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
}

getWeather();

document.querySelector('#city').onchange = getWeather;