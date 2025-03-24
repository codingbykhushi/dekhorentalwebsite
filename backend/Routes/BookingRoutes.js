import express from "express";
import { createBooking } from "../Controllers/BookingController.js";

const BookingRouter = express.Router();

// ✅ Room Booking API
BookingRouter.post("/book",createBooking);

export default BookingRouter;
