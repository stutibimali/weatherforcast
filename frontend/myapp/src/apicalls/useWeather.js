import { useState } from "react";

const useWeather = (selectedCity, selectedState) => {
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    forecast: [],
    error: false,
  });

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
      setWeather((prev) => ({ ...prev, loading: true, error: false }));

      const q = encodeURIComponent(`${selectedCity},${selectedState},US`);
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${API_KEY}&units=metric`;

      const [currentResp, forecastResp] = await Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl),
      ]);

      if (!currentResp.ok || !forecastResp.ok) {
        throw new Error("API request failed");
      }

      const currentData = await currentResp.json();
      const forecastData = await forecastResp.json();


      const dailyForecast = [];
      const seenDates = new Set();

      for (const item of forecastData.list) {
        const date = item.dt_txt.split(" ")[0];
        if (!seenDates.has(date)) {
          seenDates.add(date);
          dailyForecast.push(item);
        }
        if (dailyForecast.length === 6) break;
      }

      setWeather({
        data: currentData,
        forecast: dailyForecast,
        loading: false,
        error: false,
      });

    } catch (err) {
      console.error("getWeather error:", err);
      setWeather({ data: {}, forecast: [], loading: false, error: true });
      alert("An error occurred while fetching weather data.");
    }
  };

  return { weather, getWeather };
};

export default useWeather;
