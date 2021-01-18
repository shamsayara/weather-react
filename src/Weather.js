import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState(null);
  let [result, setResult] = useState(false);
  let [weather, setWeather] = useState({});

  function displayWeather(response) {
    setResult(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  let weatherData = {
    country: "GB",
    date: "Mon 04 Jan 2021",
    time: "10:00",
  };
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  let currentDetails = (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="Search"
          placeholder="Enter a city..."
          onChange={updateCity}
        />
        <input type="Submit" value="Search" />
      </form>
      <p className="loading"> Search Your Location</p>
    </div>
  );

  if (result) {
    return (
      <div className="Newweather">
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
                <button>Current Location</button>
              </div>
            </div>
          </div>
          <h1>{city}</h1>
          <h2>{weatherData.country}</h2>
          <h3>{weatherData.date}</h3>
          <h3>{weatherData.time}</h3>
          <img className="icon" src={weather.icon} alt={weather.description} />
          <h4 className="units">
            <strong>{Math.round(weather.temperature)} </strong> °C | °F
          </h4>
          <div className="container">
            <ul>
              <li>Humidity: {weather.humidity}%</li>
              <li>Wind: {Math.round(weather.wind)} km/h</li>
              <li>Description: {weather.description}</li>
            </ul>
            <div className="rowweatherforecast"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return currentDetails;
  }
}
