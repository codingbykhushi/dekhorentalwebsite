import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/FetchByCity.css"

const FetchByCity = () => {
    const { city } = useParams(); // URL se city ka naam lo
    const [pgs, setPgs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPGs = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/pgs/filterPg?city=${city}`);
                setPgs(response.data);
            } catch (error) {
                console.error("Error fetching PGs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPGs();
    }, [city]);

    return (
        <div>
        <h1 className="title">Welcome to Dekho Rentals</h1>
            <h2 className="subtitle">Available PG in {city}</h2>
        <div className="pg-container">
            
            {loading ? <p>Loading...</p> : 
                pgs.length > 0 ? (
                    <div className="pg-list">
                        {pgs.map((pg) => (
                            <div key={pg.id} className="pg-card">
                                {pg.img && <img src={pg.img} alt={pg.pgName} />}
                                <h3><strong>PG Name:</strong>{pg.pgName}</h3>
                                <p><strong>City:</strong> {pg.address}</p>
                                <p><strong>Total Rooms:</strong>{pg.totalRooms}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No PGs found in {city}</p>
                )
            }
        </div>
        </div>
    );
};

export default FetchByCity;
