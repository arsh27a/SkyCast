import React from "react";
import LiveWeather from "./LiveWeather";

const Body = ({ weatherData, airData, forecastData }) => {
  return (
    <div className="body-component">
      <LiveWeather
        weatherData={weatherData}
        airData={airData}
        forecastData={forecastData}
      />
    </div>
  );
};

export default Body;
