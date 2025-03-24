import { DataTypes } from "sequelize";
import sequelize from "../Config/Database.js";
import Tenant from "./tenantModel.js";
import RoomsAvailable from "./RoomsAvailable.js";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookingId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tenant,
      key: "id",
    },
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RoomsAvailable,
      key: "id",
    },
  },
  bookingDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("Booked", "Cancelled", "Completed"),
    defaultValue: "Booked",
  },
}, {
  hooks: {
    beforeCreate: (booking) => {
      // Custom Booking ID (Readable Format)
      booking.id = `BKG-${Date.now()}`;
    },
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});


sequelize
  .sync()
  .then(() => console.log("Booking table created"))
  .catch((err) => console.error("Error creating Booking table:", err));


// Relationships
Tenant.hasMany(Booking, { foreignKey: "tenantId", onDelete: "CASCADE" });
Booking.belongsTo(Tenant, { foreignKey: "tenantId" });

RoomsAvailable.hasMany(Booking, { foreignKey: "roomId", onDelete: "CASCADE" });
Booking.belongsTo(RoomsAvailable, { foreignKey: "roomId" });


export default Booking;
