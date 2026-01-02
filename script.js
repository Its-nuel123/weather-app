const apiKey = "c62788a574fdd5cfe5c021f57201d676"; // Replace with your API key

// Get current weather
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("City not found or API issue");
    const data = await response.json();

    document.getElementById("current-weather").innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
    `;
  } catch (error) {
    document.getElementById("current-weather").innerHTML = `<p>${error.message}</p>`;
  }
}

// Get 5-day forecast
async function getForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("City not found or API issue");
    const data = await response.json();

    // Pick one forecast per day (around noon)
    const dailyForecast = data.list.filter((f) => f.dt_txt.includes("12:00:00"));

    let forecastHTML = "";
    dailyForecast.forEach((day) => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      const temp = day.main.temp;
      const weather = day.weather[0].description;
      const icon = day.weather[0].icon;

      forecastHTML += `
        <div class="forecast-card">
          <h3>${date}</h3>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
          <p>${temp}°C</p>
          <p>${weather}</p>
        </div>
      `;
    });

    document.getElementById("forecast-cards").innerHTML = forecastHTML;
  } catch (error) {
    document.getElementById("forecast-cards").innerHTML = `<p>${error.message}</p>`;
  }
}

// Called when user clicks button
function updateWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) return alert("Please enter a city");
  getWeather(city);
  getForecast(city);
}
