import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Body from "./Body";

const HomePage = () => {
  const [weatherData, setWeatherData] = useState(null); // State to hold API data
  const [forecastData, setForecastData] = useState(null); // Stores 7-day forecast
  const [airData, setAirData] = useState(null); // hold air data

  return (
    <div className="home-container">
      <Navbar
        setWeatherData={setWeatherData}
        setForecastData={setForecastData}
        setAirData={setAirData}
      />
      <Body
        weatherData={weatherData}
        airData={airData}
        forecastData={forecastData}
      />
    </div>
  );
};

export default HomePage;
