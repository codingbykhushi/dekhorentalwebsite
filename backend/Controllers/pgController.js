import PG from "../Models/PGModel.js";



export const addPG = async (req, res) => {
  try {
    const { name,state,city, address, ownerId, totalRooms } = req.body;
    console.log("Received Data:", req.body); 

    
    const image = req.file ? req.file.path : null;

    
    if (!name ||!state ||!city || !address || !ownerId) {
      return res.status(400).json({ message: "All fields required" });
    }

    
    const newPG = await PG.create({
      name,
      state,
      city,
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
        attributes: ["id", "name","state","city", "address", "totalRooms", "image","ownerId"], 
      });
  
      
      const updatedPGs = pgs.map(pg => ({
        id: pg.id,
        OwnerId:pg.ownerId,
        pgName: pg.name,
        state:pg.state,
        city:pg.city,
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

 export const getPGByLocal = async (req, res) => {
  try {
    const { address } = req.params;

    if (!address) {
      return res.status(400).json({ message: "Address is required!" });
    }

    const pgs = await PG.findAll({
      where: { address: address }, 
      attributes: [ "name", "state", "city", "address", "totalRooms", "image"],
    });

    if (!pgs.length) {
      return res.status(404).json({ message: "No PG found for this address" });
    }

    const formattedPGs = pgs.map(pg => ({
      pgName: pg.name,
      state: pg.state,
      city: pg.city,
      address: pg.address,
      totalRooms: pg.totalRooms,
      img: pg.image ? `http://localhost:3001/${pg.image.replace(/\\/g, "/")}` : null,
    }));

    res.status(200).json(formattedPGs);
  } catch (error) {
    console.error("Error fetching PG by address:", error);
    res.status(500).json({ message: "Internal server error" });
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
        attributes: ["id", "name","state","city", "address", "totalRooms", "image", "ownerId"], 
      });
  
      
      const updatedRooms = rooms.map(room => ({
        id: room.id,
        ownerId: room.ownerId,
        pgName: room.name,
        state:room.state,
        city:room.city,
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
        state:state || pg.state,
        city:city || pg.city,
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
    
  