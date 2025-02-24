import React, { useState, useEffect } from "react";
import LiveWeather from "./LiveWeather";

const Body = ({ weatherData, airData, forecastData }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true"; // (darkmode) Key in localStorage
    setIsDarkMode(savedTheme);
    document.body.classList.toggle("dark-mode", savedTheme); //(dark-mode) CSS class
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((previousMode) => {
      const newMode = !previousMode;
      document.body.classList.toggle("dark-mode", newMode);
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <div className="body-component">
      <LiveWeather
        weatherData={weatherData}
        airData={airData}
        forecastData={forecastData}
      />

      {/* Theme Toggle Button */}
      <button
        className=" mode-btn btn btn-outline-light position-fixed bottom-3 end-3 border-0 bg-transparent text-white"
        onClick={toggleTheme}
      >
        {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
};

export default Body;
