import React, { createContext, useState, useEffect } from "react";

export const OffersContext = createContext();

const OffersProvider = ({ children }) => {
  const [offers, setOffers] = useState(() => {
    const storedOffers = localStorage.getItem("offers");
    return storedOffers ? JSON.parse(storedOffers) : [];
  });

 
  useEffect(() => {
    localStorage.setItem("offers", JSON.stringify(offers));
  }, [offers]);

  const addOffer = (offer) => {
    const newOffers = [...offers, { id: Date.now(), ...offer }];
    setOffers(newOffers);
  };

  const deleteOffer = (id) => {
    const updatedOffers = offers.filter((offer) => offer.id !== id);
    setOffers(updatedOffers);
  };

  const editOffer = (id, updatedOffer) => {
    const updatedOffers = offers.map((offer) =>
      offer.id === id ? { ...offer, ...updatedOffer } : offer
    );
    setOffers(updatedOffers);
  };

  return (
    <OffersContext.Provider value={{ offers, addOffer, deleteOffer, editOffer }}>
      {children}
    </OffersContext.Provider>
  );
};

export default OffersProvider;
