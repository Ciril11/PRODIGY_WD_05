// Replace this with your actual API key from OpenWeatherMap
const apiKey = "YOUR_API_KEY"; // <-- Leave like this for now

// Function to get weather using city name
function getWeather() {
  const cityInput = document.getElementById("cityInput").value;

  // If input is empty, alert user
  if (cityInput === "") {
    alert("Please enter a city name.");
    return;
  }

  // Build the API URL using city name
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  // Call the function to fetch and display data
  fetchWeatherData(apiUrl);
}

// Function to get weather using user's current location
function getLocationWeather() {
  // Check if browser supports geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Build the API URL using latitude and longitude
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      fetchWeatherData(apiUrl);
    }, function () {
      alert("Unable to get your location.");
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Function to fetch data from OpenWeatherMap and show it
function fetchWeatherData(url) {
  fetch(url)
    .then(function (response) {
      return response.json();  // Convert response to JSON
    })
    .then(function (data) {
      if (data.cod !== 200) {
        alert("Weather data not found for this location.");
        return;
      }

      // Display weather info
      const weatherDiv = document.getElementById("weatherInfo");
      weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
      `;
    })
    .catch(function (error) {
      console.log("Error fetching data:", error);
    });
}
