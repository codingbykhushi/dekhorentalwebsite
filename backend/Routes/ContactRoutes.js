import express from "express";
import { submitContact, getContacts } from "../Controllers/ContactController.js";

const contactRoutes = express.Router();

contactRoutes.post("/submit", submitContact);
contactRoutes.get("/getContacts", getContacts);

export default contactRoutes;
