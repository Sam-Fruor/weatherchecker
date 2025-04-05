function searchCity() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    window.location.href = `weather.html?city=${encodeURIComponent(city)}`;
  }
}


const apiKey = "cf46d6859ad23fa84d213737cfc1071b";

// Get query parameter from URL
const params = new URLSearchParams(window.location.search);
const city = params.get('city');

if (city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(err => console.error(err));
}

function displayWeather(data) {
  const container = document.getElementById("weatherContainer");
  if (data.cod !== 200) {
    container.innerHTML = `<h2>City not found. Try again.</h2>`;
    return;
  }

  const weatherTips = getWeatherTip(data.weather[0].main);

  container.innerHTML = `
    <h2>${data.name}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    <p><em>Travel Tip:</em> ${weatherTips}</p>
  `;
}

function getWeatherTip(condition) {
  switch (condition.toLowerCase()) {
    case "rain":
      return "Don't forget an umbrella!";
    case "clear":
      return "Great day for sightseeing!";
    case "snow":
      return "Pack warm clothes and boots!";
    case "clouds":
      return "Could be gloomy—bring a light jacket.";
    default:
      return "Check local news for travel updates.";
  }
}

function goBack() {
  window.location.href = "index.html";
}
