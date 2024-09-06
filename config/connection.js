const Sequelize = require("sequelize");
require("dotenv").config();

// Create the sequelize connection instance
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // This is important for self-signed certificates on services like Render
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME, // For local development
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || "localhost", // Use localhost or DB_HOST
        dialect: "postgres",
      }
    );

module.exports = sequelize;
