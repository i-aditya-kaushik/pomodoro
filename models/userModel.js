const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    house:{
      type: String,
      default: ""
    },
    active_tasks: [{task:{
      type: mongoose.Schema.Types.ObjectId, ref: "Tasks",
    }, time_elapsed: {type: Number,default:0}}],
    prev_tasks: [{
      type: mongoose.Schema.Types.ObjectId, ref: "Tasks",
      default: []
    }],
    tags: [{
      type: mongoose.Schema.Types.ObjectId, ref: "Tags",
    }],
    num_login: {
      type:Number,
      default: 1
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
