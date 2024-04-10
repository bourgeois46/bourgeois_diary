import React from "react";
import "./WeatherItem.css";
import { getWeatherImage } from "../util/get-weather-image";

const WeatherItem = ({ weatherId, weatherName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`WeatherItem ${
        isSelected ? `WeatherItem_on_${weatherId}` : ""
      }`}
    >
      <img src={getWeatherImage(weatherId)} alt="weatherImgs" />
      <div>{weatherName}</div>
    </div>
  );
};

export default WeatherItem;
