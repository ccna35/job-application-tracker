import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "job_application_tracker",
  connectionLimit: 10, // Adjust as needed
});

// Export the pool for use in other modules
export const connection = pool.promise(); // Using the promise-based API for better async/await handling
