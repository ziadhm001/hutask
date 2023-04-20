import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
/* import multer from 'multer';
import fs from 'fs';
import path from 'path'; */
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { connectDB } from "./db.js";
import { errorHandler } from "./middlewares/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server started at ${PORT}`)))
  .catch((err) => console.log(err));
