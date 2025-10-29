
import Select from "./Select";
import useStates from "../apicalls/useStates";
import useCities from "../apicalls/useCities";

const Dropdowns = ({
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  getWeather,
}) => {
  const states = useStates();
  const cities = useCities(selectedState);

  return (
    <div className="dropdowns">
      <Select selected={selectedState} setSelected={setSelectedState} values={states} />
      <Select selected={selectedCity} setSelected={setSelectedCity} values={cities} />
      <button onClick={getWeather}>Get Weather</button>
    </div>
  );
};

export default Dropdowns;
