import { useEffect, useState } from "react";

const useStates = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "United States" }),
        });
        const data = await response.json();
        if (data?.data?.states) {
          setStates(data.data.states.map((s) => s.name));
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  return states;
};

export default useStates;
