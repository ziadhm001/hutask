import express from "express"
import multer from "multer"
import { uuid } from "uuidv4"
import { validateDbId } from "../middlewares/index.js"
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
    getMTaskCount,
    getMCompletedCount,
    getMOngoingCount,
    getMTasks,
    downloadFile,
} from "../controllers/taskController.js"
import { requireAuth } from "../middlewares/requireAuth.js"

const DIR = "./public/"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-")
        cb(null, uuid() + "-" + fileName)
    },
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "application/pdf"
        ) {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(
                new Error("Only .png, .jpg, .jpeg and .pdf format allowed!")
            )
        }
    },
})

const router = express.Router()

router.use(requireAuth)
router.get("/", getTasks)

router.get("/countOngoing", getOngoingCount)

router.post("/manager", getMTasks)

router.get("/count", getTaskCount)

router.post("/mcount", getMTaskCount)

router.get("/countByCreator", getTaskCountByCreator)

router.get("/countCompleted", getCompletedCount)

router.post("/mcountCompleted", getMCompletedCount)

router.post("/mcountOngoing", getMOngoingCount)

router.get("/assigned/:id", getTaskByAssigned)

router.get("/task/:id", validateDbId, getTaskById)

router.get("/file/:name", downloadFile)

router.get("/creator/:id", validateDbId, getTaskByCreator)

router.post("/register", upload.single("source"), registerTask)

router.put("/task/:id", validateDbId, updateTask)

router.delete("/:id", validateDbId, deleteTask)

export default router
