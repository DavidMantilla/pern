const {Router}= require('express');
const pool = require("../db");
const router = Router();
const {
  getAllTasks,
  getTask,
  deleteTask,
  updaeTask,
  createTask,
} = require("../controllers/tasks.controller");

router.get("/tasks", getAllTasks);

router.get("/tasks/:id", getTask);
router.post("/tasks/", createTask);


router.delete("/tasks/:task",deleteTask);

router.put("/tasks/:id", updaeTask);




module.exports= router;
