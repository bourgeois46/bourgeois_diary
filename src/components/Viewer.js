import React from "react";
import { emotionList } from "../util/constants";
import { weatherList } from "../util/constants_weather";
import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-image";
import { getWeatherImage } from "../util/get-weather-image";

const Viewer = ({ emotionId, weatherId, content, photo }) => {
  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );

  const weatherItem = weatherList.find(
    (item) => String(item.weatherId) === String(weatherId)
  );

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 사진</h4>
        <div className="img_wrapper">
          <img src={photo} alt={photo} />
        </div>
      </section>
      <section>
        <h4>오늘의 기분</h4>
        <img
          src={getEmotionImage(emotionId)}
          alt="emotion_img"
          className="emotion_img"
        />
        <div>{emotionItem.emotionName}</div>
      </section>
      <section>
        <h4>오늘의 날씨</h4>
        <img
          src={getWeatherImage(weatherId)}
          alt="weather_img"
          className="weather_img"
        />
        <div>{weatherItem.weatherName}</div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
