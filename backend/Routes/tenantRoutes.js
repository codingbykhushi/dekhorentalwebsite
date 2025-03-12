import express from "express";
import { registerTenant, loginTenant, verifyToken, getTenant } from "../Controllers/tenantController.js";

const TenantRouter = express.Router();

TenantRouter.post("/register", registerTenant);

TenantRouter.post("/login", loginTenant);

TenantRouter.get("/allTenant", getTenant);

TenantRouter.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({ message: "Profile accessed", tenant: req.tenant });
});

export default TenantRouter;