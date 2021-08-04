const router = require("express").Router();
const auth = require("../middlewares/auth");
const taskController = require("../controller/taskController");

router.post("/addtask", auth, taskController.addtask);
router.put("/taskupdate", auth, taskController.taskupdate);

module.exports = router;
