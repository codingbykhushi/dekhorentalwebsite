import PG from "../Models/PGModel.js";
import { Op } from "sequelize"; 


export const addPG = async (req, res) => {
  try {
    const { name, address, ownerId, totalRooms } = req.body;
    console.log("Received Data:", req.body); 

    
    const image = req.file ? req.file.path : null;

    
    if (!name || !address || !ownerId) {
      return res.status(400).json({ message: "All fields required" });
    }

    
    const newPG = await PG.create({
      name,
      address,
      ownerId,
      totalRooms: totalRooms || 0,
      image,
    });

    res.status(201).json({ message: "PG successfully added", pg: newPG });
  } catch (error) {
    console.error("During the add pg error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllPGs = async (req, res) => {
    try {
      const pgs = await PG.findAll({
        attributes: ["id", "name", "address", "totalRooms", "image","ownerId"], 
      });
  
      
      const updatedPGs = pgs.map(pg => ({
        id: pg.id,
        OwnerId:pg.ownerId,
        pgName: pg.name,
        address: pg.address,
        totalRooms: pg.totalRooms,
        img: pg.image ? `http://localhost:3001/${pg.image.replace(/\\/g, "/")}` : null, // ✅ Fix
      }));
  
      res.status(200).json(updatedPGs);
    } catch (error) {
      console.error("During the fetch pg error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
 // ✅ Sequelize ka Op import karna zaroori hai

export const getPGsByCity = async (req, res) => {
    try {
        const { city } = req.query; // ✅ Query params se city ka naam lo

        if (!city) {
            return res.status(400).json({ message: "City name is required" });
        }

        const pgs = await PG.findAll({
            where: { 
                address: { [Op.like]: `%${city}%` } // ✅ Address me city ka naam match karega
            },
            attributes: ["id", "name", "address", "totalRooms", "image", "ownerId"],
        });

        const updatedPGs = pgs.map(pg => ({
            id: pg.id,
            ownerId: pg.ownerId,
            pgName: pg.name,
            address: pg.address,
            totalRooms: pg.totalRooms,
            img: pg.image ? `http://localhost:3001/${pg.image.replace(/\\/g, "/")}` : null,
        }));

        res.status(200).json(updatedPGs);
    } catch (error) {
        console.error("During the fetch city-based pg error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


  export const getOwnerPG = async (req, res) => {
    try {
      const ownerId = req.user.id; 
  
      if (!ownerId) {
        return res.status(400).json({ message: "Owner ID is required!" });
      }
  
      const rooms = await PG.findAll({
        where: { ownerId: ownerId },
        attributes: ["id", "name", "address", "totalRooms", "image", "ownerId"], 
      });
  
      
      const updatedRooms = rooms.map(room => ({
        id: room.id,
        ownerId: room.ownerId,
        pgName: room.name,
        address: room.address,
        totalRooms: room.totalRooms,
        img: room.image ? `http://localhost:3001/${room.image.replace(/\\/g, "/")}` : null, 
      }));
  
      res.status(200).json(updatedRooms);
    } catch (error) {
      console.error("Error fetching owner rooms:", error);
      res.status(500).json({ message: "Error fetching owner rooms", error: error.message });
    }
  };
  export const deletePG = async (req, res) => {
    try {
      const { pgid } = req.params;
      console.log("Deleting PG with ID:", pgid); 
  
      const pg = await PG.findByPk(pgid); 
      if (!pg) {
        return res.status(404).json({ message: "PG not found" });
      }
  
      await pg.destroy(); 
      res.status(200).json({ message: "PG deleted successfully" });
    } catch (error) {
      console.error("Error deleting PG:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const updatePG = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, address, totalRooms } = req.body;
      
      
      const pg = await PG.findByPk(id);
      if (!pg) {
        return res.status(404).json({ message: "PG not found" });
      }
  
      
      const image = req.file ? req.file.path : pg.image;
  
     
      await pg.update({
        name: name || pg.name,
        address: address || pg.address,
        totalRooms: totalRooms || pg.totalRooms,
        image,
      });
  
      res.status(200).json({ message: "PG successfully update ho gaya!", pg });
    } catch (error) {
      console.error("during the fetch pg error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
    
  