import express from "express";
import cors from "cors";
import authRoutes from "./routes/login.js";
import localRoutes from "./routes/schedules.js";
import catalogRoutes from "./routes/coincidences.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/local", localRoutes);
app.use("/api/catalog", catalogRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
