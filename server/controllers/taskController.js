import Task from "../models/task.js";
import User from "../models/user.js";
import { returnNotFound } from "../middlewares/index.js";
import { generateCrudMethods } from "../services/index.js";
const taskCrud = generateCrudMethods(Task);

const getTasks = (req, res, next) => {
  taskCrud
    .getAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => next(err));
};

const getTaskById = (req, res, next) => {
  taskCrud
    .getById(req.params.id)
    .then((data) => {
      data ? res.send(data) : returnNotFound(req, res);
    })
    .catch((err) => next(err));
};

const getTaskCount = async (req, res, next) => {
  try {
    const count = await Task.count();
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

const getTaskCountByCreator = async (req, res, next) => {
  try {
    const count = await Task.countByCreator(req.body);
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

const getCompletedCount = async (req, res, next) => {
  try {
    const count = await Task.countCompleted();
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

const getOngoingCount = async (req, res, next) => {
  try {
    const count = await Task.countOngoing();
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

const getTaskByCreator = (req, res, next) => {
  taskCrud
    .getByCreator(req.params.id)
    .then((data) => {
      data ? res.send(data) : returnNotFound(req, res);
    })
    .catch((err) => next(err));
};

const registerTask = (req, res, next) => {
  const task = req.body;
  task.assigned = [];
  taskCrud
    .create(task)
    .then((data) => {
      User.addCreatedTask(data._id, req.body.creator);
      res.status(201).json(data);
    })
    .catch((err) => next(err));
};

const updateTask = (req, res, next) => {
  let data = req.body;
  if (req.body.progress === 100) data.status = "تم الانتهاء";
  else if (req.body.progress && req.body.progress > 0)
    data.status = "جاري التنفيذ";
  taskCrud
    .update(req.params.id, data)
    .then((data) => {
      data ? res.send(data) : returnNotFound(req, res);
    })
    .catch((err) => next(err));
};

const deleteTask = (req, res, next) => {
  taskCrud
    .delete(req.params.id)
    .then((data) => {
      data ? res.send(data) : returnNotFound(req, res);
    })
    .catch((err) => next(err));
};

export {
  getTasks,
  getTaskById,
  getTaskCount,
  getTaskCountByCreator,
  getCompletedCount,
  getOngoingCount,
  getTaskByCreator,
  registerTask,
  updateTask,
  deleteTask,
};
