import express from "express";
import { addOwner,ownerLogin,getOwners,deleteOwner } from "../Controllers/ownerController.js";


const OwnerRouter = express.Router();


OwnerRouter.post("/add", addOwner);
OwnerRouter.post("/login", ownerLogin);
OwnerRouter.get("/Allowner", getOwners);
OwnerRouter.delete("/deleteowner/:id", deleteOwner);


export default OwnerRouter;
