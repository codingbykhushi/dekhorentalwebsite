import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";
import Owner from "./ModelOwner.js"; 

const PG = sequelize.define("PG", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: Owner,
      key: "id",
    },
    onDelete: "CASCADE", 
  },
  totalRooms: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "PGs"
});


Owner.hasMany(PG, { foreignKey: "ownerId", onDelete: "CASCADE" });
PG.belongsTo(Owner, { foreignKey: "ownerId" });

export default PG;
