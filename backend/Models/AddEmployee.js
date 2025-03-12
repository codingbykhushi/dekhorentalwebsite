import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";

const AddEmployee = sequelize.define("AddEmployee", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aadhaarNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "Staff",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plainPassword: {
     type: DataTypes.STRING, 
     allowNull: false 
    },
});


sequelize.sync()
  .then(() => {
    console.log("AddEmployee table created successfully");
  })
  .catch((err) => {
    console.log("Error while creating AddEmployee table", err);
  });

export default AddEmployee;
