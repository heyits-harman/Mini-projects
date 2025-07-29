const baseUrl = "http://api.weatherapi.com/v1/current.json?key=e568ffadb3ae46f8adb121544252607&q=";

const inputCity = document.querySelector("#city-input");
const btn = document.querySelector("#search-btn");
const cityName = document.querySelector("#city-name");
const temp = document.querySelector("#temperature");
const tempToggleBtn = document.querySelector("#unit-toggle");
const weather = document.querySelector("#condition");
const weatherIcon = document.querySelector("#icon");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");


btn.addEventListener('click', async () => {

  const city = inputCity.value;
  let toggleState = false;

  const url = `${baseUrl}${city}&aqi=no`;

  let response = await fetch(url);
  let data = await response.json();
  
  const fetchedTempInCel = data.current.temp_c;
  const fetchedTempInFar = data.current.temp_f;
  const fetchedWeather = data.current.condition.text;
  const fetchedIcon = data.current.condition.icon;
  const fetchedHumidity = data.current.humidity;
  const fetchedWind = data.current.wind_kph;

  cityName.innerHTML = city;
  temp.innerText = fetchedTempInCel + "°C";
  weather.innerText = "Weather: " + fetchedWeather;
  weatherIcon.src = fetchedIcon;
  humidity.innerText = "Humidity: " + fetchedHumidity + "%";
  wind.innerText = "Wind: " + fetchedWind + "km/h";

  tempToggleBtn.addEventListener('click', () => {
    
    toggleState = !toggleState;
    if(toggleState){
      temp.innerText = fetchedTempInFar + "°F";
    }
    else{
      temp.innerText = fetchedTempInCel + "°C";
    }
    
  });

  const div = document.querySelector(".hidden");
  div.style.display = "block";
  
});

