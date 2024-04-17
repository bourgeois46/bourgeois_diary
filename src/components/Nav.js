import React from "react";
import "./Nav.css";
import home from "../assets/home.png";
import fashion from "../assets/fashion.png";
import weather from "../assets/weather.png";
import my from "../assets/my.png";

const Nav = () => {
  return (
    <div className="nav">
      <img
        src={home}
        alt="home"
        className="home"
        onClick={() => (window.location.href = "/home")}
      />
      <div className="home_text">홈</div>

      <img
        src={fashion}
        alt="fashion"
        className="fashion"
        onClick={() => (window.location.href = "/fashion")}
      />
      <div className="fashion_text">패션</div>

      <img
        src={weather}
        alt="weather"
        className="weather"
        onClick={() => (window.location.href = "/weather")}
      />
      <div className="weather_text">날씨</div>

      <img
        src={my}
        alt="my"
        className="my"
        onClick={() => (window.location.href = "/home")}
      />
      <div className="my_text">마이페이지</div>
    </div>
  );
};

export default Nav;
