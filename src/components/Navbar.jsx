import React, { useState } from "react";
import Logo from "/images/myLogo1.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Navbar = ({ setWeatherData, setForecastData, setAirData }) => {
  const [searchByUser, setSearchByUser] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  const searchBaseData = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // api call for lat lon
      const response = await axios.get(url);
      // console.log(response.data, " base API Response");
      const { lat, lon } = response.data.coord; // Use coordinates from 'data'
      setWeatherData(response.data);
      airWeatherfetch(lat, lon);
      forecastWeatherFetch(lat, lon);
    } catch (error) {
      console.error("API Error:", error);
      alert("Error: City not found. Please check the name and try again.");
    }
  };
  const forecastWeatherFetch = async (lat, lon) => {
    if (lat && lon) {
      try {
        const searchApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}`;
        const searchedDataResponse = await axios.get(searchApiUrl);
        // console.log("searchedDataResponse", searchedDataResponse.data);
        setForecastData(searchedDataResponse.data);
      } catch (error) {
        console.error("Error fetching   serached data:", error);
      }
    }
  };
  // air pollution api call
  const airWeatherfetch = async (lat, lon) => {
    if (lat && lon) {
      try {
        const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        // Fetch air pollution data using coordinates
        const airPollutionResponse = await axios.get(airPollutionUrl);
        // console.log(airPollutionResponse.data, "AIR api");
        setAirData(airPollutionResponse.data);
      } catch (error) {
        console.error("Error fetching air pollution data:", error);
      }
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setSearchByUser(value);
    console.log(value);
  };
  // prevent default part
  const handleSubmit = (e) => {
    e.preventDefault();
    searchBaseData(searchByUser);
  };
  // handle key down
  // const handleKeyDown = (evt) => {
  //   if (evt != Enter) {
  //     alert("Kindly enter the city name to proceed.");
  //     return;
  //   }
  //   searchBaseData(searchByUser);
  // };
  return (
    <div className="navbar-container">
      <header className="py-3    ml-3 mr-3 mb-3 fixed-top">
        <div className="container-fluid d-flex flex-wrap justify-content-between align-items-center gap-3">
          <a
            href="/"
            className="d-flex align-items-center link-body-emphasis text-decoration-none"
          >
            <img src={Logo} className="bi me-2" alt="logo" />
            <span className="fs-2 text-light">SkyCast</span>
          </a>

          <div className="search">
            <form action="/weather" method="post" onSubmit={handleSubmit}>
              <input
                type="text"
                autoComplete="off"
                placeholder="Search your City..."
                name="location"
                value={searchByUser}
                className="text-black"
                onChange={handleInput}
                // onKeyDown={handleKeyDown}
              />
              <button type="submit" className="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
