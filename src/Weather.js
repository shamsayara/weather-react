import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate.js";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      city: response.data.name,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      date: new Date(response.data.dt * 1000),
      time: "10:00",
      country: "GB",
    });
  }

  if (weatherData.ready) {
    return (
      <div className="newWeather">
        <div className="container">
          <div className="row">
            <div className="col-10">
              <form className="search">
                <input type="Search" placeholder="Enter a city..." />
                <input type="Submit" value="Search" />
              </form>
              <div className="col-3">
                <button>Current Location</button>
              </div>
            </div>
          </div>
          <h1 className="text-capitalize">{weatherData.city}</h1>
          <h2>{weatherData.country}</h2>
          <h3>
            <FormattedDate date={weatherData.date} />
          </h3>
          <img
            className="icon"
            src={weatherData.icon}
            alt={weatherData.description}
          />
          <h4 className="units">
            <strong>{Math.round(weatherData.temperature)} </strong> °C | °F
          </h4>
          <div className="container">
            <ul>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind: {Math.round(weatherData.wind)} km/h</li>
              <li className="text-capitalize">
                Description: {weatherData.description}
              </li>
            </ul>
            <div className="rowweatherforecast"></div>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
    const units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultcity}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
  }
}
