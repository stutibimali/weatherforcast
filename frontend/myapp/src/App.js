import React, { useEffect, useState } from "react";
import "./App.css";
import Select from "./components/Select";
import Visalizer from "./components/Visalizer";

function App() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "United States" }),
        });
        const data = await response.json();
        if (data && data.data && data.data.states) {
          setStates(data.data.states.map((s) => s.name));
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              country: "United States",
              state: selectedState,
            }),
          });
          const data = await response.json();
          if (data && data.data) {
            setCities(data.data);
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedState]);


  const getWeather = async () => {
    if (!selectedCity) {
      alert("Please select a city!");
      return;
    }

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    if (!API_KEY) {
      alert("Missing API key. Add REACT_APP_WEATHER_API_KEY to .env and restart dev server.");
      return;
    }

    try {
      setWeather(prev => ({ ...prev, loading: true, error: false }));

      if (!selectedCity || !selectedState) {
        alert("Please enter both city and state!");
        return;
      }

      const q = encodeURIComponent(`${selectedCity},${selectedState},US`);
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`;

      console.log("Weather URL:", weatherUrl);

      const wResp = await fetch(weatherUrl);
      if (!wResp.ok) {
        console.error("Weather API HTTP", wResp.status);
        setWeather({ data: {}, loading: false, error: true });
        alert("Weather API error: " + wResp.status);
        return;
      }

      const wJson = await wResp.json();
      console.log("wJson", wJson);

      setWeather({ data: wJson, loading: false, error: false });

    } catch (err) {
      console.error("getWeather error:", err);
      setWeather({ data: {}, loading: false, error: true });
      alert("An error occurred while fetching weather.");
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>🌤️ Weather App</h1>
        <p>
          Created by <strong>Stuti Bimali</strong>
        </p>
        <b>Please Select State and City</b>
        <div className="dropdowns">
          <Select 
          selected={selectedState} 
          setSelected={setSelectedState} 
          values={states}
          />
          <Select 
          selected={selectedCity} 
          setSelected={setSelectedCity} 
          values={cities}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>
        <Visalizer weather={weather}/>
      
        <a
          href="https://www.linkedin.com/in/stuti-bimali"
          target="_blank"
          rel="noopener noreferrer"
          className="info-button"
        >
          ℹ️ About PM Accelerator
        </a>
      </header>
    </div>
  );
}

export default App;
