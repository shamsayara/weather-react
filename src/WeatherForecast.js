import React, { useState } from "react";
import axios from "axios";
import WeatherForecastPreview from "./WeatherForecastPreview";

import "./Forecast.css";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  function handleForecastResponse(response) {
    setForecast(response.data);
    setLoaded(true);
  }

  if (loaded && props.city === forecast.city.name) {
    return (
      <div className="weatherforecast row">
        <WeatherForecastPreview data={forecast.list[0]} />
        <WeatherForecastPreview data={forecast.list[1]} />
        <WeatherForecastPreview data={forecast.list[2]} />
        <WeatherForecastPreview data={forecast.list[3]} />
        <WeatherForecastPreview data={forecast.list[4]} />
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
