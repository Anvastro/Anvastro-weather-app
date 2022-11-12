function formatDate(date) {
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];
  let number = today.getDate();
  return `${hours}:${minutes} ${day}, ${month} ${number}`;
}
let today = new Date();
let mainDate = document.querySelector("#main-date");
mainDate.innerHTML = formatDate(today);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];
  let number = date.getDate();

  return `${day}, ${month} ${number}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row two">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0) {
      if (index < 7) {
        forecastHTML =
          forecastHTML +
          `<div class="col">
          <div class="card">
          <div id="forecast-date" class="card-header bg-transparent">${formatDay(
            forecastDay.dt
          )}</div>
          <img src="images/${
            forecastDay.weather[0].icon
          }.png" class="card-img-top" alt="icon" />
          <div class="card-body">
          <h5 class="card-title"><span id="forecast-max">${Math.round(
            forecastDay.temp.max
          )}</span><span id="forecast-first"></span> | <span id="forecast-min">${Math.round(
            forecastDay.temp.min
          )}</span><span id="forecast-second"></span>
          </h5>
          <h6 id="forecast-description" class="card-text">${
            forecastDay.weather[0].description
          }</h6>
          </div>
          </div>
          </div>`;
      }
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function cityPosition(position) {
  position.preventDefault();
  let apiKey = "b110a6f2cf89a7609c27cec0f53fa75b";
  let units = "metric";
  let cityinput = document.querySelector("#search-city-input");
  let cityname = cityinput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(currentTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityPosition);

function currentTemperature(response) {
  document.querySelector("#main-city-name").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#main-city-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#main-description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#main-icon")
    .setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  document
    .querySelector("#main-icon")
    .setAttribute("alt", response.data.weather[0].main);

  celsTemp = Math.round(response.data.main.temp);
  feelsLike = Math.round(response.data.main.feels_like);

  getForecast(response.data.coord);
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b110a6f2cf89a7609c27cec0f53fa75b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  let celDegrees = document.querySelector("#main-degrees");
  let realCelDegrees = document.querySelector("#real-degrees");

  celDegrees.innerHTML = `°C`;
  realCelDegrees.innerHTML = `°C`;

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  axios.get(apiUrl).then(currentTemperature);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let locationIcon = document.querySelector("#location-icon");
locationIcon.addEventListener("click", currentLocation);

function fahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsTemp * 9) / 5 + 32;
  let realFahrenheitTemp = (feelsLike * 9) / 5 + 32;

  let cityMainTemp = document.querySelector("#main-city-temp");
  let fahDegrees = document.querySelector("#main-degrees");
  let realFeel = document.querySelector("#real-feel");
  let realFahDegrees = document.querySelector("#real-degrees");

  cityMainTemp.innerHTML = Math.round(fahrenheitTemp);
  realFeel.innerHTML = Math.round(realFahrenheitTemp);

  fahDegrees.innerHTML = `°F`;
  realFahDegrees.innerHTML = `°F`;

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function celsiusTemperature(event) {
  event.preventDefault();
  let cityMainTemp = document.querySelector("#main-city-temp");
  let celDegrees = document.querySelector("#main-degrees");
  let realFeel = document.querySelector("#real-feel");
  let realCelDegrees = document.querySelector("#real-degrees");

  cityMainTemp.innerHTML = celsTemp;
  realFeel.innerHTML = feelsLike;

  celDegrees.innerHTML = `°C`;
  realCelDegrees.innerHTML = `°C`;

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsTemp = null;
let feelsLike = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusTemperature);

let apiKey = "b110a6f2cf89a7609c27cec0f53fa75b";
let city = "port erin";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(currentTemperature);
