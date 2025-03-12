import Payment from "../Models/Payment.js";
import RoomsAvailable from "../Models/RoomsAvailable.js";
import PG from "../Models/PGModel.js";
import dotenv from "dotenv";


dotenv.config();

// 🔹 Room Details Fetch API
export const getRoomDetails = async (req, res) => {
  try {
    const rooms = await RoomsAvailable.findByPk(req.params.roomId, {
      include: [{ model: PG, as: "PG" }],
    });

    if (!rooms) {
      return res.status(404).json({ success: false, message: "Room not found!" });
    }

    res.json({
      roomId: rooms.id,
      pgName: rooms.PG?.name || "PG Not Found",
      roomName: rooms.name || "Room Name Not Available",  // ✅ Fixed
      roomNo: rooms.roomNumber || "Room No Not Available",  // ✅ Fixed
      description: rooms.description,
      price: rooms.price,
      fixedAdvance: 1000,
    });
  } catch (error) {
    console.error("Error fetching room details:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🔹 Process Payment API
export const processPayment = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    // **Step 1: Payment Table me Entry Save karna**
    const payment = await Payment.create({
      userId,
      roomId,
      status: "Pending",
    });

    // **Step 2: Bank of Baroda API Call (Jab aayegi tab update karenge)**
    const bankApiUrl = `https://bankofbaroda.com/pay?amount=1000&user=${userId}&room=${roomId}`;

    res.json({ success: true, paymentId: payment.id, paymentUrl: bankApiUrl });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ success: false, message: "Payment Failed" });
  }
};

// 🔹 Update Payment Status (Bank API se callback aane pe)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId, transactionId, status } = req.body;

    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    payment.transactionId = transactionId;
    payment.status = status;
    await payment.save();

    res.json({ success: true, message: "Payment updated successfully" });
  } catch (error) {
    console.error("Payment Update Error:", error);
    res.status(500).json({ success: false, message: "Failed to update payment" });
  }
};
