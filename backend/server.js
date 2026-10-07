import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
