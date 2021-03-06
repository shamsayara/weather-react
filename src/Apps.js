import React, { useState } from "react";
import axios from "axios";
import Weather from "./Weather.js";
import WeatherForecast from "./WeatherForecast.js";

export default function Apps(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      city: response.data.name,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: response.data.weather[0].icon,
      date: new Date((response.data.dt + response.data.timezone) * 1000),
      time: "10:00",
      lat: response.data.coord.lat,
      lon: response.data.coord.lon,
    });
  }
  function search() {
    const apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
    const units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(current);
  }

  function current(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    let apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="newWeather">
        <div className="container">
          <div className="row">
            <div className="col-10">
              <form className="search" onSubmit={handleSubmit}>
                <input
                  type="Search"
                  placeholder="Enter a city..."
                  onChange={updateCity}
                />
                <input type="Submit" value="Search" />
              </form>
              <div className="col-3">
                <button onClick={getCurrentLocation}>Current Location</button>
              </div>
            </div>
          </div>
          <Weather data={weatherData} />
          <WeatherForecast city={weatherData.city} />
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
