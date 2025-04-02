import express from "express";
import { addPG,getAllPGs,getOwnerPG,deletePG,updatePG,getPGByLocal} from "../Controllers/pgController.js";
import { GetOwnerPGToken } from "../Middleware/jwtutils.js";
 
import multer from "multer";

const PGRouter = express.Router();

const upload = multer({ dest: 'uploads/' });

PGRouter.post("/addPg",upload.single("image"), addPG); 
PGRouter.get("/allPg", getAllPGs);
PGRouter.get("/filterPg/:address", getPGByLocal);
PGRouter.delete("/deletePg/:pgid",deletePG); 
PGRouter.put("/updatePg/:id",updatePG);
PGRouter.get("/ownerPg",GetOwnerPGToken, getOwnerPG); 

export default PGRouter;
