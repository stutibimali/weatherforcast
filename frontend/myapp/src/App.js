import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import useWeather from "./apicalls/useWeather";
import Dropdowns from "./components/Dropdowns";
import Visualizer from "./components/Visualizer";

function App() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [message, setMessage] = useState("");

  const { weather, getWeather } = useWeather(selectedCity, selectedState);

  useEffect(() => {
    fetch("/api/test")   // proxy handles backend
      .then(res => res.json())
      .then(data => setMessage(data.msg))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <p style={{ color: "green" }}>{message}</p>
        <Dropdowns
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          getWeather={getWeather}
        />
        <div className="DataExtract">
          <Visualizer weather={weather} />
        </div>
      </header>
    </div>
  );
}




export default App;
