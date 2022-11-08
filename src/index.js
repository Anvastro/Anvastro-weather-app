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
  return `${day} ${hours}:${minutes}`;
}
let today = new Date();
let mainDate = document.querySelector("#main-date");
mainDate.innerHTML = formatDate(today);

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
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#main-icon")
    .setAttribute("alt", response.data.weather[0].main);

  celsTemp = Math.round(response.data.main.temp);
  feelsLike = Math.round(response.data.main.feels_like);
}
function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b110a6f2cf89a7609c27cec0f53fa75b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

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
  let fahDegrees = document.querySelector("#degrees");
  let realFeel = document.querySelector("#real-feel");
  let realFahDegrees = document.querySelector("#real-temperature");
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
  let celDegrees = document.querySelector("#degrees");
  let realFeel = document.querySelector("#real-feel");
  let realCelDegrees = document.querySelector("#real-temperature");
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
