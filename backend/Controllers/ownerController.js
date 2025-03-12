import jwt from "jsonwebtoken";
import Owner from "../Models/ModelOwner.js";
import bcrypt from "bcryptjs";  


export const addOwner = async (req, res) => {
  try {
    const { name, email, pgName, aadhaarNumber, password,plainPassword } = req.body;

    if (!name || !email || !pgName || !aadhaarNumber || !password||plainPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingOwner = await Owner.findOne({ where: { email } });
    const existingAadhaar = await Owner.findOne({ where: { aadhaarNumber } });

    if (existingOwner) {
      return res.status(400).json({ message: "Owner already exists with this email" });
    }

    if (existingAadhaar) {
      return res.status(400).json({ message: "Aadhaar number already exists" });
    }

    // ✅ Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Store hashed password
    const newOwner = await Owner.create({
      name,
      email: email.toLowerCase(),
      pgName,
      aadhaarNumber,
      password: hashedPassword,
      plainPassword: password,  
    });

    res.status(201).json({
      message: "Owner added successfully",
      owner: {
        id: newOwner.id,
        name: newOwner.name,
        email: newOwner.email,
        pgName: newOwner.pgName,
        aadhaarNumber: newOwner.aadhaarNumber,
        plainPassword: password, 
      },
    });
  } catch (error) {
    console.error("Error adding owner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const ownerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const owner = await Owner.findOne({ where: { email } });

    if (!owner) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

   
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign(
      { id: owner.id, email: owner.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, ownerId: owner.id , name: owner.name,
      email:owner.email,
      pgName: owner.pgName,
      aadhaarNumber: owner.aadhaarNumber,
      plainPassword: password, });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};




export const getOwners = async (req, res) => {
  try {
    const owners = await Owner.findAll({ attributes: ["id", "name", "email", "pgName", "aadhaarNumber","plainPassword"] });

    res.status(200).json(owners);
  } catch (error) {
    console.error("Error fetching owners:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


 export const deleteOwner = async (req, res) => {
  const ownerId = req.params.id; 
  console.log("owner id",ownerId)
  try {
    const deletedOwner = await Owner.destroy({
      where: { id: ownerId }, 
    });

    if (!deletedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    console.error("Error deleting owner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


