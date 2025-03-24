import Booking from "../Models/Booking.js";
import RoomsAvailable from "../Models/RoomsAvailable.js";

// ✅ Room Booking Controller
export const createBooking = async (req, res) => {
  try {
    const { roomId, startDate, endDate, rentAmount, securityDeposit } = req.body;
    const tenantId = req.user.id; // Authenticated Tenant

    // ✅ Room availability check
    const existingBooking = await Booking.findOne({ where: { roomId, status: "Booked" } });
    if (existingBooking) {
      return res.status(400).json({ message: "Room is already booked!" });
    }

    // ✅ Create Booking
    const booking = await Booking.create({
      tenantId,
      roomId,
      startDate,
      endDate,
      rentAmount,
      securityDeposit,
    });

    res.status(201).json({ message: "Room booked successfully!", booking });
  } catch (error) {
    res.status(500).json({ message: "Error booking room!", error: error.message });
  }
};
