const Tasks = require("../models/taskModel");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const taskController = {
    addtask: async (req, res) => {
        try {
          const user = await Users.findById(req.user.id);
          if (!user) return res.status(400).json({ msg: "User does not exist."});
    
          const {
            name,
            duration
          } = req.body;
          const tags = user.tags
          const newTask = new Tasks({ name,duration,tags});
          const addedtask = await newTask.save();
          req.body.active_tasks = addedtask.id;
          await Users.findOneAndUpdate(
            { _id: req.user.id },
            {
              $push: {"active_tasks": {task: [addedtask.id]}},
            }
          );
          return res.json({ msg: "Added to Tasks list" });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },
    taskupdate: async (req, res) => {
        try {
          const user = await Users.findById(req.user.id);
          if (!user) return res.status(400).json({ msg: "User does not exist." });
          await Users.findOneAndUpdate(
            { _id: req.user.id },
            {
              active_tasks: [req.body.tasks,0],
            }
          );
    
          return res.json({ msg: "Updated user tasks" });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
};

module.exports = taskController;
