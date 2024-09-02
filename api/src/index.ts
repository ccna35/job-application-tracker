import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import users from "./routes/users";
import applications from "./routes/applications";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/users", users);
app.use("/api/v1/applications", applications);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export the app for testing
export default app;
