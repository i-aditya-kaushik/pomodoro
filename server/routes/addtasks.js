const router = require("express").Router();
const auth = require("../middlewares/auth");
const taskController = require("../controller/taskController");

router.post("/addtask", auth, taskController.addtask);
router.post("/increasecurrentpomodoro", auth, taskController.increasecurrentpomodoro);
router.put("/taskupdatenotes", auth, taskController.taskupdatenotes);
router.get("/gettasksuser", auth, taskController.gettasksuser);
router.get("/getprevtasks", auth, taskController.getprevtasks);
router.put("/deleteactivetask", auth, taskController.deleteactivetask);
router.get("/gettasks" , auth ,taskController.gettasks)

module.exports = router;
