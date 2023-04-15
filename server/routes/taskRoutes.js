import express from "express";
import { validateDbId } from "../middlewares/index.js";
import {
  getTasks,
  getTaskCount,
  getTaskCountByCreator,
  getTaskById,
  getTaskByCreator,
  getCompletedCount,
  getOngoingCount,
  updateTask,
  deleteTask,
  registerTask,
  getTaskByAssigned,
} from "../controllers/taskController.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getTasks);

router.get("/count", getTaskCount);

router.get("/countByCreator", getTaskCountByCreator);

router.get("/countCompleted", getCompletedCount);

router.get("/countOngoing", getOngoingCount);

router.get("/assigned/:id", getTaskByAssigned);

router.get("/task/:id", validateDbId, getTaskById);

router.get("/creator/:id", validateDbId, getTaskByCreator);

router.post("/register", registerTask);

router.put("/task/:id", validateDbId, updateTask);

router.delete("/:id", validateDbId, deleteTask);

export default router;
