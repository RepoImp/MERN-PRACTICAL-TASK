const express = require("express");
const {
  createTaskSchema,
  getAllTasksSchema,
  updateTaskSchema,
  moveTaskSchema,
  deleteTaskSchema,
} = require("../validation-schemas/taskSchema");
const {
  createTask,
  getAllTasks,
  deleteTask,
  moveTask,
  updateTask,
} = require("../controllers/taskController");
const validateRequest = require("../middlewares/validationHandler");
const router = express.Router();

router.get(
  "/get/:column_id",
  validateRequest(getAllTasksSchema, "params"),
  getAllTasks
);
router.post("/create", validateRequest(createTaskSchema), createTask);
router.put("/update", validateRequest(updateTaskSchema), updateTask);
router.patch("/move", validateRequest(moveTaskSchema), moveTask);
router.delete(
  "/delete/:task_id",
  validateRequest(deleteTaskSchema, "params"),
  deleteTask
);

module.exports = router;
