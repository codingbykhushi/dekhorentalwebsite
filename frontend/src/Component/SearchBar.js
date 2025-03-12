import React, { useState } from "react";
import "../css/Searchbar.css";

const SearchBar = ({ onPriceChange, onMinPriceChange, onLocationChange }) => {
  // State variables
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // State and City mapping
  const stateCityMap = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Hubli"],
    Rajasthan: ["Jaipur", "Kota", "Udaipur"],
    Punjab: ["Amritsar", "Ludhiana", "Jalandhar"],
    Haryana: ["Gurugram", "Faridabad", "Panipat"],
  };

  return (
    <div className="search-bar-container">
      {/* Max Price Input */}
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => {
          setMaxPrice(e.target.value);
          onPriceChange(e.target.value);
        }}
        className="search-input"
      />

      {/* Min Price Input */}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(e.target.value);
          onMinPriceChange(e.target.value);
        }}
        className="search-input"
      />

      {/* State Dropdown */}
      <select
        value={selectedState}
        onChange={(e) => {
          setSelectedState(e.target.value);
          setSelectedCity(""); // Reset city when state changes
        }}
        className="search-input"
      >
        <option value="">Select State</option>
        {Object.keys(stateCityMap).map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.target.value);
          onLocationChange(e.target.value);
        }}
        className="search-input"
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {selectedState &&
          stateCityMap[selectedState].map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SearchBar;
