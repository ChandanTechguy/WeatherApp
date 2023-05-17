import React, { useState, useEffect } from "react";
import "../components/style.css";
import WeatherDetails from "./WeatherDetails";

function SearchMain() {
  const [searchTerm, setSearchTerm] = useState("Hyderabad");
  const [tempInfo, setTempInfo] = useState({})

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=e12d55714ae69407ff3e09f110c5db10`;

      let res = await fetch(url);
      let data = await res.json();
      let {temp, humidity, pressure} = data.main
      const {main:weatherType} = data.weather[0]
      const {name} = data
      const {speed} = data.wind
      const {country, sunset} = data.sys

      const newWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset
      }
      setTempInfo(newWeatherInfo)

      //console.log(data);
    } catch (error) {
      console.log(error); 
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="type city name"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
       
        <button className="searchButton" onClick={getWeatherInfo}>
          Search
        </button>
        </div>
      </div>
      <WeatherDetails {...tempInfo} />
    </>
  );
}

export default SearchMain;
