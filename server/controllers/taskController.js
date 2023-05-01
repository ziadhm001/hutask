import Task from "../models/task.js"
import User from "../models/user.js"
import { returnNotFound } from "../middlewares/index.js"
import { generateCrudMethods } from "../services/index.js"
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
let __dirname = path.dirname(__filename)
__dirname = __dirname.substring(0, __dirname.lastIndexOf("\\"))
const taskCrud = generateCrudMethods(Task)

const getTasks = (req, res, next) => {
    taskCrud
        .getAll()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => next(err))
}

const downloadFile = (req, res, next) => {
    console.log(__dirname)
    const file = `${__dirname}\\public\\${req.params.name}`
    console.log(file)
    res.download(file) // Set disposition and send it.
}

const getMTasks = (req, res, next) => {
    taskCrud
        .getAllCondition({ department: req.body.department })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => next(err))
}

const getTaskById = (req, res, next) => {
    taskCrud
        .getById(req.params.id)
        .then((data) => {
            data ? res.send(data) : returnNotFound(req, res)
        })
        .catch((err) => next(err))
}

const getTaskCount = async (req, res, next) => {
    try {
        const count = await Task.count()
        res.status(200).json({ count })
    } catch (err) {
        next(err)
    }
}

const getMTaskCount = async (req, res, next) => {
    try {
        const count = await Task.Mcount({ department: req.body.department })
        res.status(200).json({ count })
    } catch (err) {
        next(err)
    }
}

const getTaskCountByCreator = async (req, res, next) => {
    try {
        const count = await Task.countByCreator(req.body)
        res.status(200).json({ count })
    } catch (err) {
        next(err)
    }
}

const getCompletedCount = async (req, res, next) => {
    try {
        const count = await Task.countCompleted()
        res.status(200).json({ count })
    } catch (err) {
        next(err)
    }
}

const getMCompletedCount = async (req, res, next) => {
    try {
        const count = await Task.McountCompleted({
            department: req.body.department,
        })
        res.status(200).json({ count })
    } catch (err) {
        next(err)
    }
}

const getOngoingCount = async (req, res, next) => {
    try {
        const count = await Task.countOngoing()
        res.status(200).json({ count })
    } catch (err) {
        next(err)
    }
}

const getMOngoingCount = async (req, res, next) => {
    try {
        const count = await Task.McountOngoing({
            department: req.body.department,
        })
        res.status(200).json({ count })
    } catch (err) {
        next(err)
    }
}

const getTaskByCreator = (req, res, next) => {
    taskCrud
        .getByCreator(req.params.id)
        .then((data) => {
            data ? res.send(data) : returnNotFound(req, res)
        })
        .catch((err) => next(err))
}

const getTaskByAssigned = (req, res, next) => {
    taskCrud
        .getByAssigned(req.params.id)
        .then((data) => {
            data ? res.send(data) : returnNotFound(req, res)
        })
        .catch((err) => next(err))
}

const registerTask = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host")
    const task = req.body
    if (req.file) task.source = url + "/public/" + req.file.filename
    task.assigned = []
    taskCrud
        .create(task)
        .then((data) => {
            User.addCreatedTask(data._id, req.body.creator)
            res.status(201).json(data)
        })
        .catch((err) => next(err))
}

const updateTask = (req, res, next) => {
    let data = req.body
    if (req.body.progress === 100) {
        data.status = "تم الانتهاء"
        User.unAssignCompleted(req.params.id)
    } else if (req.body.progress && req.body.progress > 0)
        data.status = "جاري التنفيذ"
    taskCrud
        .update(req.params.id, data)
        .then((data) => {
            data ? res.send(data) : returnNotFound(req, res)
        })
        .catch((err) => next(err))
}

const deleteTask = (req, res, next) => {
    taskCrud
        .delete(req.params.id)
        .then((data) => {
            data ? res.send(data) : returnNotFound(req, res)
        })
        .catch((err) => next(err))
}

export {
    getTasks,
    getTaskById,
    getTaskCount,
    getTaskCountByCreator,
    getTaskByAssigned,
    getCompletedCount,
    getOngoingCount,
    getTaskByCreator,
    registerTask,
    updateTask,
    deleteTask,
    getMCompletedCount,
    getMOngoingCount,
    getMTaskCount,
    getMTasks,
    downloadFile,
}
