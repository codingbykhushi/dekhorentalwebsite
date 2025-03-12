import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";
import PG from "./PGModel.js"; 

const RoomsAvailable = sequelize.define("RoomsAvailable", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  roomNumber: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Vacant",
  },
  pgId: {
    type: DataTypes.INTEGER,
    references: {
      model: PG,
      key: "id",
    },
    allowNull: false,
    onDelete: "CASCADE", 
  },
}, {
  tableName: "RoomsAvailable"
});


RoomsAvailable.belongsTo(PG, { foreignKey: "pgId", onDelete: "CASCADE" });
PG.hasMany(RoomsAvailable, { foreignKey: "pgId", onDelete: "CASCADE" });

export default RoomsAvailable;
