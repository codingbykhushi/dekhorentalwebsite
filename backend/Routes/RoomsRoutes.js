import express from "express";
import { addRoom,getRoomsByPGId,deleteRoom,updateRoom,getAllRooms } from "../Controllers/RoomController.js";

const Roomrouter = express.Router();

Roomrouter.post("/addroom", addRoom); 
Roomrouter.get("/:pgId", getRoomsByPGId); 
Roomrouter.get("/getallroom", getAllRooms); 
Roomrouter.delete("/deleteRoom/:roomId", deleteRoom);
Roomrouter.put("/updateRoom/:roomId", updateRoom);
export default Roomrouter;
