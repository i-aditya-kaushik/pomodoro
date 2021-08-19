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
            total_pomodoro
          } = req.body;
          const tags = user.tags
          const newTask = new Tasks({ name,total_pomodoro,tags});
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
      gettasksuser: async (req,res) => {
        try{
          const user = await Users.findById(req.user.id);
          if (!user) return res.status(400).json({ msg: "User does not exist." });
          const active_tasks = await Tasks.find( { "_id" : { $in : user.active_tasks.map(item => {
            return(item.task)
          })}}).select("name total_pomodoro _id popularity");
          const tags = await Users.findById(req.user.id).select("active_tasks").populate('active_tasks.task')
          const final_ret = tags.active_tasks.map(item=>{
            item = {id:item.task.id,name:item.task.name,total_pomodoro:item.task.total_pomodoro, popularity: item.task.popularity
              ,pomodoro_done:item.pomodoro_done}
            return item
          })
          return res.json({final_ret: final_ret})
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      deleteactivetask : async (req,res) => {
        try{
          const user = await Users.findById(req.user.id);
          if (!user) return res.status(400).json({ msg: "User does not exist." });
          const {
            id,
            total_pomodoro,
            pomodoro_done
          } = req.body;
          if(total_pomodoro == pomodoro_done){
            await Users.findOneAndUpdate(
              { _id: req.user.id },
              {
                $push: {"prev_tasks": id},
              }
            );
          }
          await Users.findOneAndUpdate( 
              { _id: req.user.id },
              {
                  $pull: {
                    active_tasks: { task : id }
                  }
              },
              { safe: true },
          );
          return res.json({msg:"Done successfully"})
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
};

module.exports = taskController;
