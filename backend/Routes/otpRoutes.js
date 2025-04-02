import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";

const router = express.Router();
let otpStore = {}; // Store OTP temporarily

// Send OTP
router.post("/send", async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999);
  otpStore[email] = otp;

  // Send Email (Use your own SMTP details)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "your-email@gmail.com", pass: "your-password" },
  });

  await transporter.sendMail({
    from: "your-email@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`,
  });

  res.json({ message: "OTP sent successfully." });
});

// Verify OTP
router.post("/verify", (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] == otp) {
    delete otpStore[email]; // Remove OTP after use
    res.json({ message: "OTP verified successfully." });
  } else {
    res.status(400).json({ message: "Invalid OTP." });
  }
});

export default router;
