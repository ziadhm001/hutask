import User from "../models/user.js";
import Task from "../models/task.js";
import { returnInvalid } from "../middlewares/index.js";
import { generateCrudMethods } from "../services/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const userCrud = generateCrudMethods(User);
const createUser = async (req, res, next) => {
  const { username, email, password, name, role, department } = req.body;
  try {
    const user = await User.signup(
      username,
      email,
      password,
      name,
      role,
      department
    );
    const token = createToken(user._id);
    res.status(201).json({ _id: user._id, token, name: user.name });
  } catch (err) {
    next(err);
  }
};

const validateUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, token, name: user.name });
  } catch (err) {
    next(err);
  }
};

const getUsersByRole = async (req, res, next) => {
  try {
    const role = { role: req.params.role };
    const users = await User.findByRole(role);
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "employee" }).select({
      name: 1,
      email: 1,
      department: 1,
      role: 1,
      assigned: 1,
    });
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const getMUsers = async (req, res, next) => {
  try {
    const users = await User.find({
      department: req.body.department,
      role: "employee",
    }).select({
      name: 1,
      email: 1,
      department: 1,
      role: 1,
      assigned: 1,
    });
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const getUnassignedUsers = async (req, res, next) => {
  try {
    const users = await User.find({ assigned: [], role: "employee" }).select({
      name: 1,
      email: 1,
      department: 1,
      role: 1,
      assigned: 1,
    });
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const getMUnassignedUsers = async (req, res, next) => {
  try {
    const users = await User.find({
      department: req.body.department,
      role: "employee",
      assigned: [],
    }).select({
      name: 1,
      email: 1,
      department: 1,
      role: 1,
      assigned: 1,
    });
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const getCreated = async (req, res, next) => {
  try {
    const users = await User.getCreated();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const getUserRole = async (req, res, next) => {
  try {
    const id = { _id: req.params.id };
    const users = await User.findRole(id);
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const getUserDepartment = async (req, res, next) => {
  try {
    const id = { _id: req.params.id };
    const users = await User.findDepartment(id);
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

const getUnassignedCount = async (req, res, next) => {
  try {
    const count = await User.countUnassigned();
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

const getMUnassignedCount = async (req, res, next) => {
  try {
    const count = await User.McountUnassigned({
      department: req.body.department,
    });
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

const assignTask = async (req, res, next) => {
  const { task_id, user_id } = req.body;
  User.assignTask(task_id, user_id);
  let response = await Task.assignUser(task_id, user_id);
  res.status(201).json(response);
};

const unAssignTask = (req, res, next) => {
  const { task_id, user_id } = req.body;
  User.unAssignTask(task_id, user_id);
  Task.unAssignUser(task_id, user_id);
  res.status(201).json({ message: "Unassigned" });
};

export {
  createUser,
  validateUser,
  getUsersByRole,
  getUserRole,
  getCreated,
  getUnassignedCount,
  assignTask,
  unAssignTask,
  getUsers,
  getUnassignedUsers,
  getMUnassignedUsers,
  getUserDepartment,
  getMUsers,
  getMUnassignedCount,
};
