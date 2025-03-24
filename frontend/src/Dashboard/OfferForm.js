import React, { useState, useContext } from "react";
import { OffersContext } from "../Component/context/OfferContext";
import "../css/OfferForm.css";
import offerImg from "../img/offer.jpg"; // Background image import

const OfferForm = () => {
  const { offers, addOffer, deleteOffer } = useContext(OffersContext);
  const [offerTitle, setOfferTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!offerTitle || !description || !discount)
      return alert("Fill all fields");
    addOffer({ 
      title: offerTitle, 
      description, 
      discount: `${discount}% OFF`, 
      bgImage: offerImg // Adding background image
    });
    setOfferTitle("");
    setDescription("");
    setDiscount("");
  };

  return (
    <div className="offer-page">
      <div className="offer-container">
        <h2>Admin - Create Offer</h2>
        <form onSubmit={handleSubmit} className="offer-form">
          <input
            type="text"
            placeholder="Offer Title"
            value={offerTitle}
            onChange={(e) => setOfferTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Offer Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
          <div className="d-flex justify-content-center">
            <button type="submit" className="w-50 d-flex justify-content-center">
              Create Offer
            </button>
          </div>
        </form>
      </div>

      <h2 className="mt-5 text-center">Manage Offers</h2>
      <div className="offers-list-container">
        {offers.map((offer) => (
          <div 
            className="offerDiv" 
            key={offer.id}
            style={{
              backgroundImage: `url(${offerImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex">
              <h3 className="mt-2">{offer.title}</h3>
            </div>
            <p>{offer.description}</p>
            <span>{offer.discount}</span>
            <div className="d-flex justify-content-end">
              <button onClick={() => deleteOffer(offer.id)} style={{ width: "60px" }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferForm;
