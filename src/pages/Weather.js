import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import styled from "styled-components";
import weatherDescKo from "../util/weatherDescKo";

const Weather = () => {
  const API_KEY = process.env.REACT_APP_API_KEY_WEATHER;
  const nav = useNavigate();
  const [weatherData, setWeatherData] = useState({});
  const today = new Date();

  // 날씨 정보 가져오기
  const getWeather = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&`
      );

      const weatherDescCode = res.data.weather[0].id; // 날씨 상태 코드
      const weatherDesc = weatherDescKo.find(
        (item) => Object.keys(item)[0] == weatherDescCode
      );

      // 상태 코드에 해당하는 한글 가져오기
      const weatherDescKorean = weatherDesc
        ? Object.values(weatherDesc)[0]
        : "";
      const weatherIcon = `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
      const temp = Math.round(res.data.main.temp);

      setWeatherData({
        description: weatherDescKorean,
        icon: weatherIcon,
        temp: temp,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 위치 정보 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }, []);

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[today.getDay()];

  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  return (
    <div>
      <Header
        title={"오늘의 날씨 확인하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
      />
      {weatherData && (
        <StyledWeatherInfo>
          <StyledText>{formattedDate}</StyledText>
          <StyledText>현재 날씨</StyledText>
          <WeatherIcon src={weatherData.icon} alt="날씨 아이콘" />
          <StyledText>{weatherData.description}</StyledText>
          <StyledTextTemp>{weatherData.temp}℃</StyledTextTemp>
        </StyledWeatherInfo>
      )}
    </div>
  );
};

const StyledWeatherInfo = styled.div`
  width: 200px;
  height: 450px;
  padding: 90px;
  text-align: center;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  border-width: 1px;
  margin-top: 70px;
  margin-left: auto;
  margin-right: auto;
`;

const WeatherIcon = styled.img`
  display: block;
  margin: 0 auto;
  width: 240px;
  height: 240px;
`;

const StyledText = styled.div`
  font-size: 27px;
  margin-top: 20px;
`;

const StyledTextTemp = styled.div`
  font-size: 70px;
  margin-top: 20px;
  color: #9ac2df;
`;

export default Weather;
