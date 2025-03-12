import express from "express";
import { getRoomDetails,processPayment,updatePaymentStatus } from "../Controllers/PaymentController.js";

const PaymentRouter = express.Router();

PaymentRouter.get("/room/:roomId", getRoomDetails);
PaymentRouter.post("/pay", processPayment);
PaymentRouter.post("/update-status", updatePaymentStatus); // ✅ Bank API se update hone ke liye

export default PaymentRouter;
