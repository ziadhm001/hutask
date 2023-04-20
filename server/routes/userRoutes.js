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
  getUsers,
  getUnassignedUsers,
  getMUnassignedUsers,
  getUserDepartment,
  getMUsers,
  getMUnassignedCount,
} from "../controllers/userController.js";

import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.post("/register", createUser);

router.get("/", getUsers);

router.get("/unassigned", getUnassignedUsers);

router.post("/unassignedmanager", getMUnassignedUsers);

router.post("/manager", getMUsers);

router.post("/login", validateUser);

router.use(requireAuth);

router.post("/assign", assignTask);

router.post("/unassign", unAssignTask);

router.get("/role/:role", getUsersByRole);

router.get("/countCreatedTasks", getCreated);

router.get("/user/role/:id", getUserRole);

router.get("/user/department/:id", getUserDepartment);

router.get("/countUnassigned", getUnassignedCount);

router.post("/mcountUnassigned", getMUnassignedCount);

export default router;
