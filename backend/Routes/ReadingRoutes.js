import express from "express";
import { addReading,getReadingByOwner,getReadingByRoom,getReadingByTenant,getAllReadings } from "../Controllers/ReadingController.js";

const ReadingRouter = express.Router();

ReadingRouter.post("/addreading", addReading);
ReadingRouter.get("/allreading", getAllReadings);  
ReadingRouter.get("/owner/:ownerId", getReadingByOwner); 
ReadingRouter.get("/tenant/:tenantId", getReadingByTenant);

ReadingRouter.get("/:pgName/:roomNo", getReadingByRoom); 

export default ReadingRouter;
