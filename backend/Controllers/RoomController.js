import RoomsAvailable from "../Models/RoomsAvailable.js";
import PG from "../Models/PGModel.js";

// ✅ Add Room
export const addRoom = async (req, res) => {
  try {
    const {roomNumber, name,description,size, price,status, pgId } = req.body;

    if (!roomNumber||!name || !price || !description || !size|| !price|| !status || !pgId) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if PG exists
    const pg = await PG.findByPk(pgId);
    if (!pg) {
      return res.status(404).json({ message: "PG not found!" });
    }

    // Create the room
    const room = await RoomsAvailable.create({
      roomNumber,
      name,
      description,
      size,
      price,
      status: status || "Vacant",
      pgId,
    });

    // Update PG's totalRooms
    pg.totalRooms = pg.totalRooms + 1;
    await pg.save();

    res.status(201).json({ message: "Room added successfully!", room });
  } catch (error) {
    console.error("Error adding room:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getAllRooms = async (req, res) => {
  try {
    const rooms = await RoomsAvailable.findAll();
    
    if (!rooms.length) {
      return res.status(404).json({ message: "No rooms available!" });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ Get Rooms by PG ID
export const getRoomsByPGId = async (req, res) => {
  try {
    const { pgId } = req.params;
    console.log("Received pgId:", pgId); 

    // Check if PG exists
    const pg = await PG.findByPk(pgId);
    console.log("PG Data:", pg);
    if (!pg) {
      return res.status(404).json({ message: "PG not found!" });
    }

    const rooms = await RoomsAvailable.findAll({ where: {pgId} });

    if (!rooms.length) {
      return res.status(404).json({ message: "No rooms found for this PG!" });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Check if room exists
    const room = await RoomsAvailable.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found!" });
    }

    // Get PG details
    const pg = await PG.findByPk(room.pgId);
    if (pg) {
      pg.totalRooms = pg.totalRooms > 0 ? pg.totalRooms - 1 : 0;
      await pg.save();
    }

    // Delete the room
    await room.destroy();

    res.status(200).json({ message: "Room deleted successfully!" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { roomNumber, name, description, size, price, status } = req.body;

    
    const room = await RoomsAvailable.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found!" });
    }

    
    room.roomNumber = roomNumber || room.roomNumber;
    room.name = name || room.name;
    room.description = description || room.description;
    room.size = size || room.size;
    room.price = price || room.price;
    room.status = status || room.status;

    await room.save();

    res.status(200).json({ message: "Room updated successfully!", room });
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
