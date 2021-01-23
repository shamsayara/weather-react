import React from "react";
import FormattedDate from "./FormattedDate.js";

export default function Weather(props) {
  return (
    <div className="WeatherInfo">
      <h1 className="text-capitalize">{props.data.city}</h1>
      <h2>{props.data.country}</h2>
      <h3>
        <FormattedDate date={props.data.date} />
      </h3>
      <img
        className="icon"
        src={props.data.icon}
        alt={props.data.description}
      />
      <h4 className="units">
        <strong>{Math.round(props.data.temperature)} </strong> °C | °F
      </h4>
      <div className="container">
        <ul>
          <li>Humidity: {props.data.humidity}%</li>
          <li>Wind: {Math.round(props.data.wind)} km/h</li>
          <li className="text-capitalize">
            Description: {props.data.description}
          </li>
        </ul>
        <div className="rowweatherforecast"></div>
      </div>
    </div>
  );
}
