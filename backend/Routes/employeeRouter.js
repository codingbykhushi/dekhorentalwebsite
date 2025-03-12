import express from "express";
import { addEmployee,getAllEmployees,updateEmployee,deleteEmployee,employeeLogin} from "../Controllers/employeeController.js";


const EmployeeRouter = express.Router();

EmployeeRouter.post("/addemployee",addEmployee)
EmployeeRouter.post("/LoginEmployee",employeeLogin)
EmployeeRouter.get("/fetchemployee",getAllEmployees)
EmployeeRouter.put("/updateemployee",updateEmployee)
EmployeeRouter.delete("/deleteemployee/:id",deleteEmployee)


export default EmployeeRouter;