import express from "express";
import { createComplaint,getAllComplaints,getComplaintById,deleteComplaint,getOwnerComplaints,getComplaintsByTenant,updateComplaintStatus} from "../Controllers/complaintController.js";
import { GetOwnerPGToken } from "../Middleware/jwtutils.js";
const Complaintrouter = express.Router();

Complaintrouter.post("/createCom", createComplaint); 
Complaintrouter.get("/getAllCom", getAllComplaints); 
Complaintrouter.get("/getByTenant/:tenantId",getComplaintsByTenant); 
Complaintrouter.get("/getCom/:id", getComplaintById);
Complaintrouter.delete("/deleteCom/:id", deleteComplaint); 
Complaintrouter.get("/getOwnerComplaint",GetOwnerPGToken,getOwnerComplaints)
Complaintrouter.put("/updateStatus/:id", updateComplaintStatus);

export default Complaintrouter;
