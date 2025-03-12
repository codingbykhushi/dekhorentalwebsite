import bcrypt from "bcryptjs";
import AddEmployee from "../Models/AddEmployee.js";
import jwt from "jsonwebtoken";



export const addEmployee = async (req, res) => {
  try{
  const { name, email, contact, aadhaarNumber, address, role, password,plainPassword} = req.body;

  if (!name || !email || !contact || !aadhaarNumber || !address || !role|| !password||plainPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingEmployee = await AddEmployee.findOne({ where: { email } });
  const existingAadhaar = await AddEmployee.findOne({ where: { aadhaarNumber } });

  if (existingEmployee) {
    return res.status(400).json({ message: "Employee already exists with this email" });
  }

  if (existingAadhaar) {
    return res.status(400).json({ message: "Aadhaar number already exists" });
  }

  const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newEmployee = await AddEmployee.create({
        name,
        email: email.toLowerCase(),
        contact,
        aadhaarNumber,
        address,
        role,
        password: hashedPassword,
        plainPassword: password,  
      });

      res.status(201).json({
        message: "Employee added successfully",
        employee: {
          id: newEmployee.id,
          name: newEmployee.name,
          email: newEmployee.email,
          contact: newEmployee.contact,
          address:newEmployee.address,
          aadhaarNumber: newEmployee. aadhaarNumber,
          plainPassword: password, 
        },
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const employeeLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await AddEmployee.findOne({ where: { email } });

    if (!employee) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

   
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

   
    const token = jwt.sign(
      { id: employee.id, email: employee.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, employeeId: employee.id ,name: employee.name,
      email:employee.email,
      contact: employee.contact,
      address:employee.address,
      aadhaarNumber: employee. aadhaarNumber,
      plainPassword: password, });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};


export const getAllEmployees = async (req, res) => {
  try {
    const employees = await AddEmployee.findAll({
      attributes: ["id", "name", "email", "contact", "aadhaarNumber", "address", "role", "plainPassword"],  // ✅ Include plain password
    });

    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching employees", error: error.message });
  }
};
 
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, aadhaarNumber, address, role, password } = req.body;

  try {
    const employee = await AddEmployee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

   
    let updatedPassword = password || employee.password;

    
    await employee.update({
      name,
      email,
      contact,
      aadhaarNumber,
      address,
      role,
      password: updatedPassword,
    });

    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Error while updating employee", error: error.message });
  }
};

 
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await AddEmployee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.destroy();
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting employee", error: error.message });
  }
};

