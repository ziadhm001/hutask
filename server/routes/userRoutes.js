import express from "express";
import {
  validateUser,
  createUser,
  getUsersByRole,
  assignTask,
  unAssignTask,
  getUnassignedCount,
  getUserRole,
  getCreated,
} from "../controllers/userController.js";

import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", validateUser);

router.use(requireAuth);

router.post("/assign", assignTask);

router.post("/unassign", unAssignTask);

router.get("/role/:role", getUsersByRole);

router.get("/countCreatedTasks", getCreated);

router.get("/user/role/:id", getUserRole);

router.get("/countUnassigned", getUnassignedCount);

export default router;
