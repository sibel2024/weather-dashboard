const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const loadingIndicator = document.getElementById('loading');

searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== '') {
    loadingIndicator.style.display = 'block';
    fetchWeatherData(city)
      .then(weatherData => {
        displayWeatherData(weatherData);
        loadingIndicator.style.display = 'none';
      })
      .catch(error => {
        weatherDisplay.innerHTML = `<p>${error.message}</p>`;
        loadingIndicator.style.display = 'none';
      });
  }
});

async function fetchWeatherData(city) {
  const apiKey = '3429df88607cd7b151bf9d6b0c36e5bf';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.cod === '404') {
    throw new Error('City not found');
  }
  return data;
}

function displayWeatherData(weatherData) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  weatherDisplay.innerHTML = `
    <h2>${weatherData.name}</h2>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
    <p>Weather: ${weatherData.weather[0].description}</p>
  `;
}

