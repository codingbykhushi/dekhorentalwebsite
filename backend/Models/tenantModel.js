import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";

const Tenant = sequelize.define("Tenant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passport: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  international: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  aadhaarNumber: {
    type: DataTypes.STRING,
    allowNull: true, 
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  visaExpiryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  }
}, {
  hooks: {
    beforeValidate: (tenant) => {
      if (!tenant.passport && !tenant.aadhaarNumber) {
        throw new Error("Either Aadhaar Number or Passport is required.");
      }
      if (tenant.international && !tenant.passport) {
        throw new Error("International tenants must provide a Passport Number.");
      }
      if (!tenant.international && !tenant.aadhaarNumber) {
        throw new Error("Indian tenants must provide an Aadhaar Number.");
      }
    },
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Tenant table created");
  })
  .catch((err) => {
    console.log("Something went wrong while creating Tenant table", err);
  });

export default Tenant;