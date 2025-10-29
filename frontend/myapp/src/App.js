import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import useWeather from "./apicalls/useWeather";
import Dropdowns from "./components/Dropdowns";
import Visualizer from "./components/Visualizer";

function App() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const { weather, getWeather } = useWeather(selectedCity, selectedState);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
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
