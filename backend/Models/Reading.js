import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";

const Reading = sequelize.define("Reading", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pgName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  previousReading: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  currentReading: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  ratePerUnit: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  fromDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  toDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  totalUnits: { 
    type: DataTypes.FLOAT,
    allowNull: false, 
  },
  billAmount: { 
    type: DataTypes.FLOAT,
    allowNull: false, 
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});


Reading.beforeValidate((reading) => {
  if (!reading.totalUnits) {
    reading.totalUnits = reading.currentReading - reading.previousReading;
  }
  if (!reading.billAmount) {
    reading.billAmount = reading.totalUnits * reading.ratePerUnit;
  }
});

export default Reading;
