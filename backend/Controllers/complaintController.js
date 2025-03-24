import Complaint from "../models/Complaint.js";
import RoomsAvailable from "../Models/RoomsAvailable.js";
import PG from "../Models/PGModel.js";
import Tenant from "../Models/tenantModel.js";

const createComplaint = async (req, res) => {
  try {
    const { name, email, phone, pgName, RoomName, roomNumber, complaintType, description,tenantId } = req.body;

    
    const pg = await PG.findOne({ where: { name: pgName } });
    if (!pg) {
      return res.status(400).json({ success: false, message: "PG not found" });
    }

    
    const room = await RoomsAvailable.findOne({
      where: { name: RoomName, roomNumber: roomNumber, pgId: pg.id },
    });

    if (!room) {
      return res.status(400).json({ success: false, message: "Room not found" });
    }

    
    const complaint = await Complaint.create({
      name,
      email,
      phone,
      complaintType,
      description,
      roomId: room.id,
      tenantId,
       
    });
    

    res.status(201).json({ success: true, message: "Complaint registered", complaint });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findAll({
      include: [
        {
          model: RoomsAvailable,
          attributes: ['id', 'name', 'roomNumber'],
          include: [
            {
              model: PG,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
   res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findByPk(req.params.id, {
      include: [{ model: RoomsAvailable, attributes: ["name", "pgId"] }],
    });

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found!" });
    }

    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteComplaint = async (req, res) => {
  try {
    const deleted = await Complaint.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Complaint not found!" });
    }
    res.status(200).json({ success: true, message: "Complaint deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getOwnerComplaints = async (req, res) => {
  try {
    const ownerId = req.user.id;
    console.log("Owner ID:", ownerId); 

    if (!ownerId) {
      return res.status(400).json({ success: false, message: "Owner ID is required!" });
    }

   
    const ownerPGs = await PG.findAll({
      where: { ownerId },
      attributes: ["id"],
    });

    const pgIds = ownerPGs.map((pg) => pg.id);

    if (pgIds.length === 0) {
      return res.status(404).json({ success: false, message: "No PGs found for this owner" });
    }

    
    const rooms = await RoomsAvailable.findAll({
      where: { pgId: pgIds },
      attributes: ["id"],
    });

    const roomIds = rooms.map((room) => room.id);

    if (roomIds.length === 0) {
      return res.status(404).json({ success: false, message: "No rooms found for this owner" });
    }

    
    const complaints = await Complaint.findAll({
      where: { roomId: roomIds },
      include: [
        {
          model: RoomsAvailable,
          attributes: ['id', 'name', 'roomNumber'],
          include: {
            model: PG, 
            attributes: ["name"],
          },
        },
      ],
    });
    

    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getComplaintsByTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant ID is required" });
    }

    console.log("Tenant ID in Backend:", req.params.tenantId);


    const complaints = await Complaint.findAll({
      where: { tenantId },
      include: [
        {
          model: RoomsAvailable,
          include: [
            {
              model: PG,
              attributes: ["name", "address"], // ✅ Fetch only necessary fields
            },
          ],
        },
      ],
    });

    res.status(200).json({ complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Server error" });
  }
};


  

export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Complaint ID received in request:", req.params.id);

    const { status } = req.body;
    console.log("Status:", req.body.status);

    const complaint = await Complaint.findByPk(id);
    console.log("Complaint fetched from DB:", complaint);
    

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    complaint.statusUpdatedAt = new Date(); // Store status update time
    await complaint.save();

    res.json({ message: "Complaint status updated successfully", complaint });
    
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export { createComplaint, getAllComplaints, getComplaintById, deleteComplaint, getOwnerComplaints };
