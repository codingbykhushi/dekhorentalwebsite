import { DataTypes } from 'sequelize';
import sequelize from '../Config/Database.js';

const PGMaintenance = sequelize.define('PGMaintenance', {
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pgName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalRooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookedRoomCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookedRoomNames: {
    // Comma separated string to store room names
    type: DataTypes.TEXT,
    allowNull: false,
  },
  income: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  commission: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Housekeepingcharge:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  expenditure: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expenditureDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

export default PGMaintenance;
