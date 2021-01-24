import React, { useState } from "react";
import axios from "axios";
import WeatherIcon from "./WeatherIcon";

import "./Forecast.css";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  function handleForecastResponse(response) {
    setForecast(response.data);
    setLoaded(true);
  }

  if (loaded) {
    console.log(forecast.list[0].main.temp);
    return (
      <div className="rowweatherforecast">
        <WeatherIcon code={forecast.list[0].weather[0].icon} />
        {Math.round(forecast.list[0].main.temp)};
      </div>
    );
  } else {
    let apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(handleForecastResponse);

    return null;
  }
}
