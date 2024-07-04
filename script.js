const apiKey = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
  const city = document.getElementById('city-input').value.trim();

  if (city === '') {
    alert('Please enter a city name');
    return;
  }

  const url = `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not fund');
    }
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    displayError(error.message);
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = '';

  const { name, main, weather } = data;

  const weatherCard = document.createElement('div');
  weatherCard.classList.add('weather-card');
  weatherCard.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${Math.round(main.temp)}°C</p>
    <p>Weather: ${weather[0].description}</p>
  `;

  weatherInfo.appendChild(weatherCard);
}

function displayError(message) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = `<div class="weather-card"><p>${message}</p></div>`;
}
