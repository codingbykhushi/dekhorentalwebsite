import jwt from "jsonwebtoken";
import Owner from "../Models/ModelOwner.js"; 
import Admin from "../Models/modelAdmin.js";
import Tenant from "../Models/tenantModel.js";
import AddEmployee from "../Models/AddEmployee.js";


const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; 

export const protect = async (req, res, next) => {
  let token;

  try {
    console.log("Authorization Header:", req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("Extracted Token:", token);
    if (!token) {
      return res.status(401).json({ message: "Authentication failed. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token:", decoded);

    let user;
    if (decoded.isOwner) {
      user = await Owner.findByPk(decoded.id);
    } else if (decoded.isAdmin) {
      user = await Admin.findOne({ where: { id: decoded.id } });
    } else if (decoded.isTenant) {
      user = await Tenant.findOne({ where: { id: decoded.id } });
    } else if (decoded.isEmployee) {
      user = await AddEmployee.findOne({ where: { id: decoded.id } });
    }
    

    console.log("User from DB:", user);

    if (!user) {
      return res.status(401).json({ message: "User not found or unauthorized" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      isOwner: decoded.isOwner || false,
    }; 

    next();
  } catch (error) {
    console.error("Auth Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token, authentication failed" });
    }

    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
