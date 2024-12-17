import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import WeatherBySearch from "./WeatherBySearch";

const LiveWeather = ({ weatherData, airData, forecastData }) => {
  const [liveWeatherData, setLiveWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [nextDays, setNextDays] = useState([]); // to track next days

  //  get next days track

  const getNextDays = () => {
    const days = [];
    const currentDate = new Date();

    for (let i = 1; i <= 6; i++) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + i);

      const formattedDate = nextDay.toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
      });
      const dayOfWeek = nextDay.toLocaleString("en-GB", {
        weekday: "long",
      });
      days.push({ date: formattedDate, day: dayOfWeek });
    }
    setNextDays(days);
  };
  // useEffect for forcast data
  useEffect(() => {
    if (forecastData) {
      getNextDays();
    }
  }, [forecastData]);

  //  get image
  const getIconUrl = (iconId) => {
    return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  };

  //   fetch live weather data
  useEffect(() => {
    const liveWeatherFetch = async (latitude, longitude) => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setLiveWeatherData(response.data);
        // set data to local storage
        localStorage.setItem("liveWeatherData", JSON.stringify(response.data));
      } catch (apiError) {
        setError("Failed to fetch weather data.");
      }
    };
    // getting current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          liveWeatherFetch(latitude, longitude);
        },
        (geoError) => {
          setError("Unable to access location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <div className="container-fluid row mx-auto mt-5 pt-5">
        <div className="live-weather-container  mt-lg-4 mt-md-5 mb-4 pt-3 col-md-5 col-lg-3">
          <section className="mb-2">
            <div className="bg-d p-5  mt-xxs-6 rounded-5">
              <h2>NOW</h2>
              <div className="inner-weather-data">
                {liveWeatherData ? (
                  <>
                    <p className="temperature">
                      {liveWeatherData.main.temp.toFixed(0)}
                      °C{" "}
                    </p>
                    <img
                      src={getIconUrl(liveWeatherData.weather[0].icon)}
                      alt="Weather Icon"
                    />
                    <p className="fs-4 fw-semibold">
                      {liveWeatherData.weather[0].description}
                    </p>
                  </>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              {liveWeatherData && (
                <div className="meta border-top border-dark-3 mt-2">
                  <p className="fs-4 mt-2">
                    <i className="fa-regular fa-calendar"></i>
                    <span className="name1">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                  <p className="fs-4 mt-2">
                    <i className="fa-solid fa-location-dot"></i>
                    <span className="name1">{liveWeatherData.name}</span>
                  </p>
                </div>
              )}
            </div>
            {/* forecast container */}
            {forecastData === null ? (
              <></>
            ) : (
              <div className="bottom-left bg-d  rounded-5  p-4 mt-4">
                <h2 className="text-center p-3">
                  6 Days Forecast in {forecastData.city.name}
                </h2>
                <div className="forecast bg-l rounded-5">
                  {nextDays.map((item, index) => (
                    <div key={index} className="forecast-item">
                      <div className="  d-flex justify-content-between align-items-center p-3 mb-3">
                        <div className="img-div d-flex justify-content-between align-items-center ">
                          <img
                            // src={`https://openweathermap.org/img/wn/${forecastData?.list?.[0]?.weather?.[0]?.icon}@2x.png`}
                            src={getIconUrl(
                              forecastData?.list?.[index]?.weather?.[0]?.icon
                            )}
                            alt="weather icon"
                          />
                          <span className="fs-4">
                            {(
                              forecastData?.list?.[index]?.main?.temp - 273.15
                            ).toFixed(0)}
                            °C
                          </span>
                        </div>
                        <p>
                          {item.date}, {item.day}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
        {/* weather component */}
        <WeatherBySearch
          weatherData={weatherData}
          airData={airData}
          forecastData={forecastData}
          className="search-weather-container mb-4 pt-3 col-md-7 col-lg-9"
        />
      </div>
      <footer className=" bg-d p-2 text-center   bottom-0 w-100">
        <div className="footer bg-l p-2">
          Copyright© 2024. Powered by{" "}
          <a href="https://openweathermap.org/">
            <img src="/images/logo.png" className="open" />{" "}
          </a>{" "}
          <span className="fw-semibold"> Developed by Arshdeepkaur </span>
        </div>
      </footer>
    </div>
  );
};

export default LiveWeather;
