import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/FetchByCity.css";

const FetchByCity = () => {
    const navigate = useNavigate(); // ✅ Navigation hook
    const { address } = useParams(); // URL se address fetch karna
    const [pgs, setPgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPGs = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get(`http://localhost:3001/api/pgs/filterPg/${address}`);
                setPgs(response.data);
            } catch (error) {
                console.error("Error fetching PGs:", error);
                setError("Something went wrong! Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPGs();
    }, [address]);

    return (
        <div>
            <h1 className="title">Welcome to Dekho Rentals</h1>
            <h2 className="subtitle">Available PGs in {address}</h2>
            
            <div className="pg-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : pgs.length > 0 ? (
                    <div className="pg-list">
                        {pgs.map((pg) => (
                            <div key={pg.id} className="pg-card">
                                {pg.img && <img src={pg.img} alt={pg.pgName} />}
                                <h3><strong>PG Name:</strong> {pg.pgName}</h3>
                                <p><strong>State:</strong> {pg.state}</p>
                                <p><strong>City:</strong> {pg.city}</p>
                                <p><strong>Address:</strong> {pg.address}</p>
                                <p><strong>Total Rooms:</strong> {pg.totalRooms}</p>
                                <button 
                                    className="view-details-btn"
                                    onClick={() => navigate(`/filterroom/${pg.id}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No PGs found in {address}</p>
                )}
            </div>
        </div>
    );
};

export default FetchByCity;
