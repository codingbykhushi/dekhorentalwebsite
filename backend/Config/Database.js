import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_HOST) {
    console.error("Missing database environment variables!");
    process.exit(1);
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306, // 👈 Add this line
      dialect: "mysql",
      logging: false, // Disable logging of SQL queries
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

connectDB();

export default sequelize;
