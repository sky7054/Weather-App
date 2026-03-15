let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let forecast = document.querySelector(".weather_forecast");
let icon = document.querySelector(".weather_icon");
let temp = document.querySelector(".weather_temp");
let minTemp = document.querySelector(".weather_min");
let maxTemp = document.querySelector(".Weather_max");

let feelsLike = document.querySelector(".weather_feelsLike");
let humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let pressure = document.querySelector(".weather_pressure");

let errorShow = document.querySelector(".errorShow");

let citySearch = document.querySelector(".weather_search");

const getimeData = (dt) => {

    const currDate = new Date(dt * 1000);

    const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return formatter = new Intl.DateTimeFormat("en-US", options).format(currDate);

}

let city ="mumbai";

// search functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityName = document.querySelector(".city_name");
  console.log(cityName.value);
  city = cityName.value;

  getWeatherData();

  cityName.value = "";
});



const getCountryName = (city) => {
    return new Intl.DisplayNames([city], { type: "region" }).of(city);

}


const getWeatherData  = async () => {
     const weatherAPI = 
   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aceb257ad787a2f78d1dea33bc5993cc`;

    try {

        const response = await fetch(weatherAPI);
        const data = await response.json();

        console.log(data);

        const{dt, main, name, sys, weather, wind} = data;

        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getimeData(dt);
        forecast.innerText = weather[0].main;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
        temp.innerHTML = `${main.temp}&#176`;
        minTemp.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        maxTemp.innerHTML = `Max:${main.temp_max.toFixed()}&#176`;
        feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        humidity.innerHTML = `${main.humidity}%`;
         w_wind.innerHTML = `${wind.speed} m/s`;
        
        pressure.innerHTML = `${main.pressure} hPa`;
        
        
    } catch (error) {
        console.log("Error Message:", error.message);
        alert("Oops! Enter Correct Name");

        
    }

}



document.addEventListener("load", getWeatherData());

