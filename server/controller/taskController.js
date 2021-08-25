const Tasks = require("../models/taskModel");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tags = require("../models/tagsModel")

const taskController = {
    addtask: async (req, res) => {
        try {
          const user = await Users.findById(req.user.id);
          if (!user) return res.status(400).json({ msg: "User does not exist."});
          const {
            name,
            total_pomodoro,
            tags
          } = req.body;
          const check = await Tasks.findOne({name: name,total_pomodoro: total_pomodoro})
          if(check){
            await Users.findOneAndUpdate(
            { _id: req.user.id , 'active_tasks.task': { $ne: check._id }},
            {
              $push: {"active_tasks" : {task: check._id}},
            }
            );
            await Tasks.findOneAndUpdate(
            { _id: check._id },
            {
              popularity: check.popularity+1,
            }
            );
            return res.json({ msg: "Added to Tasks list if did not exist" });
          }
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
    increasecurrentpomodoro: async (req, res) => {
      try {
        const user = await Users.findById(req.user.id);
        if (!user) return res.status(400).json({ msg: "User does not exist." });
        const {
          id,
          pomodoro_done
        } = req.body;
        await Users.findOneAndUpdate(
        { _id: user._id , "active_tasks._id" : id },
        {'$set': {
          'active_tasks.$.pomodoro_done': pomodoro_done+1
        }}
        );
        return res.json({ msg: "Task Updated" });
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
            item = {_id:item._id, id:item.task.id,name:item.task.name,total_pomodoro:item.task.total_pomodoro, popularity: item.task.popularity
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
            const check = await Users.find({"_id" : req.user.id , prev_tasks : id})
            if(!check.length)
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
      gettasks: async (req,res) => {
        try{
          const user = await Users.findById(req.user.id);
          if (!user) return res.status(400).json({ msg: "User does not exist." });
          const tasks = await Tasks.find({ "tags" : { $in : user.tags}}).select("name total_pomodoro tags popularity").populate("tags").sort({ popularity : "descending"})
          const final_ret = tasks.map(item=>{
            item = {name:item.name, _id: item._id, total_pomodoro:item.total_pomodoro, tagname:item.tags[0].name, popularity:item.popularity}
            return item
          })
          return res.json({Tasks: final_ret})
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      getprevtasks: async (req,res) => {
        try{
          const user = await Users.findById(req.user.id);
          if (!user) return res.status(400).json({ msg: "User does not exist." });
          const prev_tasks = await Tasks.find( { "_id" : { $in : user.prev_tasks.map(item => {
            return(item.task)
          })}}).select("name total_pomodoro _id popularity");
          const tags = await Users.findById(req.user.id).select("prev_tasks").populate('prev_tasks prev_tasks.tags').sort({ popularity : "descending"})
          const final_ret = tags.prev_tasks.map(item=>{
            item = {id:item._id,name:item.name,total_pomodoro:item.total_pomodoro, popularity: item.popularity
              ,pomodoro_done:item.pomodoro_done}
            return item
          })
          return res.json({final_ret: final_ret})
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
};

module.exports = taskController;
