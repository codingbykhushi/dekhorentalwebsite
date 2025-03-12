import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Tenant from "../Models/tenantModel.js"; 

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; 
export const registerTenant = async (req, res) => {
  try {
    const { name, contact, address, passport, international, aadhaarNumber, password, visaExpiryDate, email } = req.body;

    const existingTenant = await Tenant.findOne({ where: { email } });
    if (existingTenant) {
      return res.status(400).json({ message: "Tenant already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTenant = await Tenant.create({
      name,
      contact,
      address,
      passport: passport || null,
      international,
      aadhaarNumber: aadhaarNumber || null,
      password: hashedPassword,
      visaExpiryDate,
      email
    });

    const token = jwt.sign({ id: newTenant.id, email: newTenant.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "Tenant registered successfully", tenant: newTenant, token });
  } catch (error) {
    res.status(500).json({ message: "Error registering tenant", error: error.message });
  }
};

export const loginTenant = async (req, res) => {
  try {
    const { email, password } = req.body;

    const tenant = await Tenant.findOne({ where: { email } });
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const isMatch = await bcrypt.compare(password, tenant.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: tenant.id, email: tenant.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", tenant, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
export const getTenant = async (req, res) => {
  try {
    const tenants = await Tenant.findAll({
      attributes: [
        "id",
        "name",
        "contact",
        "address",
        "passport",
        "international",
        "aadhaarNumber",
        "visaExpiryDate",
        "email",
        "createdAt"
      ]
    });

    res.status(200).json(tenants);
  } catch (error) {
    console.error("Error fetching tenants:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing!" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.tenant = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token!" });
  }
};