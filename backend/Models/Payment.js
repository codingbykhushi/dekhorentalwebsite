import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";
import RoomsAvailable from "./RoomsAvailable.js";
import PG from "./PGModel.js";

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RoomsAvailable,
      key: "id",
    },
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000, // Fix ₹1000 Advance Payment
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true, // Bank API se jab aayegi tab update hoga
  },
  status: {
    type: DataTypes.ENUM("Pending", "Success", "Failed"),
    defaultValue: "Pending",
  },
});

RoomsAvailable.hasMany(Payment, { foreignKey: "roomId" });
Payment.belongsTo(RoomsAvailable, { foreignKey: "roomId" });

export default Payment;
