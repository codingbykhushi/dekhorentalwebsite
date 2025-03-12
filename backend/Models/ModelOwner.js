import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";

const Owner = sequelize.define("Owner", {
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
    unique: true,
  },
  pgName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aadhaarNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plainPassword: { 
    type: DataTypes.STRING,
    allowNull: false
  } 
}, {
  tableName: "Owners"
});




sequelize
  .sync()
  .then(() => {
    console.log("Owner table created");
  })
  .catch((err) => {
    console.log("Something went wrong while creating Owner table", err);
  });

export default Owner;
