import { useEffect, useState } from "react";

const useCities = (selectedState) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "United States", state: selectedState }),
        });
        const data = await response.json();
        if (data?.data) setCities(data.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [selectedState]);

  return cities;
};

export default useCities;
