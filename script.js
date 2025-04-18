const apiKey = 'c22163d43d554b8c3320812202fdab17'; 

function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const resultBox = document.getElementById('weatherResult');
      if (data.cod === 200) {
        const { main, weather, name } = data;
        resultBox.innerHTML = `
          <p><strong>${name}</strong></p>
          <p>${weather[0].description}</p>
          <p>🌡️ ${main.temp}°C</p>
          <p>💧 Humidity: ${main.humidity}%</p>
        `;
        updateBackground(weather[0].main.toLowerCase());
      } else {
        resultBox.innerHTML = `<p>City not found. Try again.</p>`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function updateBackground(condition) {
  const body = document.body;
  if (condition.includes('rain')) {
    body.style.background = '#a1c4fd';
  } else if (condition.includes('cloud')) {
    body.style.background = '#d7d2cc';
  } else if (condition.includes('clear')) {
    body.style.background = '#fceabb';
  } else {
    body.style.background = '#eeeeee';
  }
}
