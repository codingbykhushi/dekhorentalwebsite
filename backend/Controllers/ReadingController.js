import Reading from "../Models/Reading.js";

// ✅ Admin - Reading Add Karega
export const addReading = async (req, res) => {
  try {
    const { pgName, roomNo, previousReading, currentReading, ratePerUnit, fromDate, toDate, ownerId, tenantId, totalUnits,billAmount} = req.body;
    const newReading = await Reading.create({
      pgName, roomNo, previousReading, currentReading, ratePerUnit, fromDate, toDate, ownerId, tenantId ,totalUnits,billAmount
    });
    res.status(201).json({ message: "Reading added successfully!", newReading });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllReadings = async (req, res) => {
    try {
      const readings = await Reading.findAll(); 
  
      if (!readings.length) {
        return res.status(404).json({ message: "No readings found" });
      }
  
      res.status(200).json({ success: true, readings });
    } catch (error) {
      console.error("❌ Error fetching all readings:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

export const getReadingByRoom = async (req, res) => {
  try {
    const { pgName, roomNo } = req.params;
    console.log("Received Owner ID:", ownerId);  
    const readings = await Reading.findAll({
        where: { ownerId },})
    console.log("Readings Found:", readings);  
    if (!readings) return res.status(404).json({ message: "Reading not found" });
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getReadingByOwner = async (req, res) => {
    try {
      console.log("📢 Request Params:", req.params); 
      const { ownerId } = req.params;
  
      if (!ownerId) {
        console.error("⚠️ ownerId is not defined!");
        return res.status(400).json({ error: "ownerId is required" });
      }
  
      console.log("✅ Received ownerId:", ownerId);
  
      const readings = await Reading.findAll({ where: { ownerId } });
  
      if (!readings.length) {
        return res.status(404).json({ message: "No readings found for this owner" });
      }
  
      res.status(200).json(readings);
    } catch (error) {
      console.error("❌ Error fetching readings:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

  

export const getReadingByTenant = async (req, res) => {
    try {
      const { tenantId } = req.params;
      console.log("📢 Tenant ID received:", tenantId); 
  
      if (!tenantId) {
        return res.status(400).json({ error: "Tenant ID is required" });
      }
  
      const readings = await Reading.findAll({
        where: { tenantId }
      });
  
      if (readings.length === 0) {
        return res.status(404).json({ message: "No readings found for this tenant" });
      }
  
      res.status(200).json(readings);
    } catch (error) {
      console.error("❌ Error fetching readings:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  