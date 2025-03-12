import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";
import RoomsAvailable from "../Models/RoomsAvailable.js";

const Complaint = sequelize.define("Complaint", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tenantId: {
     type: DataTypes.INTEGER, 
     allowNull: false 
    },
  complaintType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statusUpdatedAt: {
     type: DataTypes.DATE,
      allowNull: true 
    },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  roomId: { 
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: RoomsAvailable,
      key: "id",
    },
  },
});

// ✅ Associations
Complaint.belongsTo(RoomsAvailable, { foreignKey: "roomId" });
RoomsAvailable.hasMany(Complaint, { foreignKey: "roomId" });

export default Complaint;
