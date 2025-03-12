import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";

const Contact = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Contact table created");
  })
  .catch((err) => {
    console.log("Something went wrong while creating Contact table", err);
  });


export default Contact;
