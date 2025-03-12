import jwt from "jsonwebtoken";
import Owner from "../Models/ModelOwner.js";

export const GetOwnerPGToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    token = token.split(" ")[1]; 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Owner.findByPk(decoded.id, { attributes: ["id", "email"] }); 

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    next();
  } catch (error) {
    console.error("Token Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
