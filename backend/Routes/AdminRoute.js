import express from "express";
import { adminSignup,adminLogin,resetAdminPassword } from "../Controllers/AdminController.js";
import { protect } from "../Middleware/middleware.js"; 

const routerAdmin = express.Router();

routerAdmin.post("/signup", adminSignup);

routerAdmin.post("/login", adminLogin);

routerAdmin.post("/reset-password", protect, resetAdminPassword);

export default routerAdmin;