import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Searchbar.css";
import nayanohraimg from "../img/nayanohra.jpeg";
import Landmark from "../img/landmark city.jpeg";
import JwaharImg from "../img/jawaharnagar.png";
import RajivImg from "../img/rajivgandhinagar.jpeg";
import mahaveer from "../img/mahaveernagar.jpeg";
import vigyan from "../img/vigyannagar.jpeg";
import Industry from "../img/industrialarea.jpg";
import llg from "../img/LPUlawgate.jpeg";
import lgv from "../img/greenvelly.jpg";
import bhutani from "../img/bhutanycolony.jpg";

const SearchBar = () => {
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  // State & City Data
  const stateCityMap = {
    Rajasthan: ["kota"],
    Punjab: ["deep nagar", "paghwada", "jalander"],
  };

  // City-wise PG Addresses with Images
  const cityAddressMap = {
    kota: [
      { name: "Nayanohra", image: nayanohraimg },
      { name: "Landmark City", image: Landmark },
      { name: "Jawahar Nagar", image: JwaharImg },
      { name: "Rajiv Gandhi Nagar", image: RajivImg },
      { name: "Mahaveer Nagar", image: mahaveer },
      { name: "Vigyan Nagar", image: vigyan },
      { name: "Industrial Area", image: Industry },
    ],
    "deep nagar":[
      {
        
      }
    ],
    paghwada:[
      { name: "LPU LAW Gate", image: llg },
      { name: "LPU Green Velly", image: lgv },
      { name: "LPU Bhutani colony", image: bhutani},
    ],
    jalander:[
      {

      },
    ]
  };

  const handleNavigate = (address) => {
    console.log("Navigating to:", address); // Debugging ke liye
    navigate(address); // ✅ Correct
};

  return (
    <div>
    <div className="search-controls">
      {/* State Dropdown */}
      <div className="search-container">
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
            setSelectedAddress("");
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
            setSelectedAddress("");
          }}
          className="search-input"
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {selectedState &&
            stateCityMap[selectedState]?.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>
      </div>
      {/* Address Options */}
      {selectedCity && (
        <div className="pgg-list">
          {cityAddressMap[selectedCity]?.map((address, index) => (
          <div
          key={index}
          className={`pg-item ${selectedAddress === address.name ? "selected" : ""}`}
          onClick={() => handleNavigate(`/fetchByCity/${address.name}`)} // ✅ Address name send karna
        >
        
         
              <div className="pg-image">
                <img src={address.image} alt={address.name} />
                <p>{address.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
   
  );
};

export default SearchBar;
