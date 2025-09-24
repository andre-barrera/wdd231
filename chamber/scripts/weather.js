const currentTemp = document.querySelector("#temp");
const weatherIcon = document.querySelector("#weatherIcon");
const description = document.querySelector("#description");
const highLow = document.querySelector("#highLow");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const forecastCard = document.querySelector("#forecast-card");

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=14.62&lon=-90.51&units=imperial&appid=284ec9710e55a5b08f5f1725e9c73b42';

// Forecast for the next 5 days
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=14.62&lon=-90.51&units=imperial&appid=284ec9710e55a5b08f5f1725e9c73b42';

async function getCurrentWeather() {
    try {
        const response = await fetch(weatherURL);
        if (!response.ok) throw Error(await response.text());
        const data = await response.json();

        currentTemp.textContent = `${Math.round(data.main.temp)}°F`;
        description.textContent = data.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        highLow.textContent = `H: ${Math.round(data.main.temp_max)}°F L: ${Math.round(data.main.temp_min)}°F`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;

        const sunriseDate = new Date(data.sys.sunrise * 1000);
        const sunsetDate = new Date(data.sys.sunset * 1000);
        sunrise.textContent = `Sunrise: ${sunriseDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        sunset.textContent = `Sunset: ${sunsetDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

    } catch (error) {
        console.error(error);
    }
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) throw Error(await response.text());
        const data = await response.json();

        forecastCard.innerHTML = '';

        for (let i = 0; i < data.list.length; i += 8) {
            const day = data.list[i];
            const date = new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
            const temp = Math.round(day.main.temp);
            const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

            const p = document.createElement('p');
            p.innerHTML = `${date}: <img src="${icon}" alt="${day.weather[0].description}"> ${temp}°F`;
            forecastCard.appendChild(p);
        }

    } catch (error) {
        console.error(error);
    }
}

getCurrentWeather();
getForecast();
