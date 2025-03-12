import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Admin table created");
  })
  .catch((err) => {
    console.log("Something went wrong while creating Admin table", err);
  });

export default Admin;