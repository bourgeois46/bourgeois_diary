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
      <img
        src={fashion}
        alt="fashion"
        className="fashion"
        onClick={() => (window.location.href = "/fashion")}
      />
      <img
        src={weather}
        alt="weather"
        className="weather"
        onClick={() => (window.location.href = "/weather")}
      />
      <img
        src={my}
        alt="my"
        className="my"
        onClick={() => (window.location.href = "/")}
      />
    </div>
  );
};

export default Nav;
