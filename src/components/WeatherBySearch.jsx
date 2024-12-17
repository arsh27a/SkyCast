import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const WeatherBySearch = ({ weatherData, airData, forecastData }) => {
  // Ensure  weatherData and airData are provided
  console.log(weatherData, " weatherData got");
  console.log(airData, "AIR` got");
  console.log(forecastData, "FORECAST got");
  if (!weatherData || !airData || !forecastData) {
    return (
      <p>No weather weatherData available. Please search for a location.</p>
    );
  }

  // Time conversion utility
  const convertTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="search-weather-container mb-4 pt-3 col-md-7 col-lg-9">
      <div className="bg-d p-5  rounded-5 mt-lg-4 mt-md-5">
        <section>
          <div className="top-right">
            <div className="location-container mb-2 d-flex justify-content-between gap-4 align-items-center">
              <h2>{weatherData.name}</h2>
              <h3>
                {Math.round(weatherData.main.temp - (273.15).toFixed(2))}°c
              </h3>
            </div>
            {/* Air Quality Section */}
            <div className="air-quality-outer-container bg-l mt-3 rounded-5">
              <div className="air-quality-inner-container p-4 mb-2 d-flex justify-content-between">
                <h3 className="name1">Air Quality Index</h3>
                <p
                  className="rounded-2"
                  style={{ backgroundColor: "#e589b7", padding: "3px" }}
                >
                  {weatherData.weather[0].main}
                </p>
              </div>
              <div className="wrapper p-4 d-flex justify-content-between gap-4 mt-3 align-items-center">
                <i className="fa-solid fa-wind fs-1"></i>
                <div className="air-container-items d-flex flex-wrap gap-5 row-gap-1">
                  <div className="d-flex gap-1 align-items-center justify-content-end">
                    <p className="fs-2">{airData.list[0].components.pm2_5}</p>
                    <p className="name1">
                      PM<sub>2.5</sub>
                    </p>
                  </div>
                  <div className="d-flex gap-1 align-items-center justify-content-end">
                    <p className="fs-2">{airData.list[0].components.so2}</p>
                    <p className="name1">
                      SO<sub>2</sub>
                    </p>
                  </div>
                  <div className="d-flex gap-1 align-items-center justify-content-end">
                    <p className="fs-2">{airData.list[0].components.no2}</p>
                    <p className="name1">
                      NO<sub>2</sub>
                    </p>
                  </div>
                  <div className="info-card d-flex gap-1 align-items-center justify-content-end">
                    <p className="fs-2">{airData.list[0].components.o3}</p>
                    <p className="name1">
                      O<sub>3</sub>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sunrise & Sunset */}
            <div className="sun-time-container bg-l mt-5 rounded-5 p-3">
              <h3 className="text-center">Sunrise & Sunset</h3>
              <div className="d-flex justify-content-around gap-2">
                <div className="sun w-50 d-flex justify-content-center align-items-center gap-3">
                  <i className="fa-regular fa-sun fs-1"></i>
                  <div className="time">
                    <p className="fs-3 name1">Sunrise</p>
                    <p className="fs-3">
                      {convertTimestamp(weatherData.sys.sunrise)}
                    </p>
                  </div>
                </div>
                <div className="sun w-50 d-flex justify-content-center align-items-center gap-3">
                  <i className="fa-solid fa-moon fs-1"></i>
                  <div className="time">
                    <p className="fs-3 name1">Sunset</p>
                    <p className="fs-3">
                      {convertTimestamp(weatherData.sys.sunset)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* small items  */}
        <div>
          {" "}
          <div className="bg-l  rounded-5 mt-3 p-4">
            <h3 className="mb-2 name1">Humidity</h3>
            <div className="d-flex justify-content-between">
              <img src=" /images/humidity.png" alt="humidity" />
              <p className="fs-2">{weatherData.main.humidity}%</p>
            </div>
          </div>
          <div className=" bg-l rounded-5 mt-3  p-4">
            <h3 className="mb-2 name1">Pressure</h3>
            <div className="d-flex justify-content-between">
              <img src=" /images/barometer.png" alt="pressure" />
              <p className="fs-2">{weatherData.main.pressure}Pa</p>
            </div>
          </div>
          <div className="bg-l rounded-5 mt-3  p-4">
            <h3 className="mb-2 name1">Visibility</h3>
            <div className="d-flex justify-content-between">
              <img src="/images/view.png" alt="visibility" />
              <p className="fs-2">{weatherData.visibility / 1000}km</p>
            </div>
          </div>
          <div className="bg-l rounded-5 mt-3  p-4">
            <h3 className="mb-2 name1">Feels Like</h3>
            <div className="d-flex justify-content-between">
              <img src="/images/temperature.png" alt="feels_like" />
              <p className="fs-2">{weatherData.main.feels_like}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherBySearch;
