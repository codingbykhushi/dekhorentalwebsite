import express from 'express';
import { addPGMaintenance,getPGMaintenanceByOwner,getAllPGMaintenance} from '../Controllers/PGMaintnanceController.js';

const PGMaintenanceRouter = express.Router();

PGMaintenanceRouter.post('/add-pg-maintenance', addPGMaintenance);
PGMaintenanceRouter.get('/pg-maintenance/:ownerId', getPGMaintenanceByOwner);
PGMaintenanceRouter.get('/pg-maintenance', getAllPGMaintenance);

export default PGMaintenanceRouter;
