import PGMaintenance from "../Models/PGMaintnance.js";


export const addPGMaintenance = async (req, res) => {
  try {
    const {
      month,
      year,
      pgName,
      ownerName,
      ownerId,
      totalRooms,
      bookedRoomCount,
      bookedRoomNames, 
      income,
      commission,
      expenditure,
      expenditureDescription
    } = req.body;

   
    const bookedRoomNamesStr = bookedRoomNames.join(', ');

    const newRecord = await PGMaintenance.create({
      month,
      year,
      pgName,
      ownerName,
      ownerId,
      totalRooms,
      bookedRoomCount,
      bookedRoomNames: bookedRoomNamesStr,
      income,
      commission,
      expenditure,
      expenditureDescription
    });

    res.status(201).json({
      message: "PG maintenance record created successfully!",
      data: newRecord
    });
  } catch (error) {
    console.error("Error adding PG maintenance record:", error);
    res.status(500).json({
      message: "Error adding PG maintenance record",
      error: error.message
    });
  }
};


export const getPGMaintenanceByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    
    const maintenanceRecords = await PGMaintenance.findAll({
      where: { ownerId }
    });
    
    res.status(200).json({
      message: "Maintenance records fetched successfully",
      data: maintenanceRecords
    });
  } catch (error) {
    console.error("Error fetching maintenance records:", error);
    res.status(500).json({
      message: "Error fetching maintenance records",
      error: error.message
    });
  }
};

export const getAllPGMaintenance = async (req, res) => {
    try {
      const { month, year } = req.query;
      let queryOptions = {};
      if (month && year) {
        queryOptions = {
          where: {
            month: month,
            year: year
          }
        };
      }
      const maintenanceRecords = await PGMaintenance.findAll(queryOptions);
      res.status(200).json({
        message: "PG maintenance records fetched successfully!",
        data: maintenanceRecords
      });
    } catch (error) {
      console.error("Error fetching maintenance records:", error);
      res.status(500).json({
        message: "Error fetching maintenance records",
        error: error.message
      });
    }
  };
  
  