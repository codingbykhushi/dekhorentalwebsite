import dotenv from "dotenv"; 
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";




import OwnerRouter from "./Routes/ownerRouter.js";
import EmployeeRouter from "./Routes/employeeRouter.js";
import routerAdmin from "./Routes/AdminRoute.js";

import TenantRouter from "./Routes/tenantRoutes.js";
import contactRoutes from "./Routes/ContactRoutes.js";
import PGRouter from "./Routes/PGRoutes.js";
import Roomrouter from "./Routes/RoomsRoutes.js";
import PG from "./Models/PGModel.js";
import Complaintrouter from "./Routes/ComplaintRoutes.js";
import ReadingRouter from "./Routes/ReadingRoutes.js";
import PGMaintenanceRouter from "./Routes/PGMaintnanceRoutes.js";
import PaymentRouter from "./Routes/PaymentRoutes.js";




const app = express();

app.use(helmet()); // Secure headers set karega
app.use(cors());
app.use(express.json()); 
app.use(morgan("dev")); // Logging ke liye

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Har IP ke liye max 100 requests
});
app.use(limiter);



// Routes
app.use("/api/owners", OwnerRouter);
app.use("/api/employees", EmployeeRouter);
app.use("/api/admin", routerAdmin);

app.use("/api/tenants",TenantRouter);
app.use("/api/contacts",contactRoutes);
app.use("/api/pgs",PGRouter);
app.use("/api/rooms",Roomrouter);
app.use("/api/complaints",Complaintrouter);
app.use("/api/readings",ReadingRouter);
app.use("/api/maintnance",PGMaintenanceRouter);
app.use("/api/payments",PaymentRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



console.log("JWT Secret:", process.env.JWT_SECRET);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const syncDatabase = async () => {
  try {
   
    await PG.sync();
    
    console.log("PG and RoomsAvailable tables created successfully");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};

syncDatabase();




