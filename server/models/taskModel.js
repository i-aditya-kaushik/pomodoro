const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    total_pomodoro: {
        type: Number,
        required: true
    },
    popularity:{
      type:Number,
      default: 1
    },
    tags:[{
      type: mongoose.Schema.Types.ObjectId, ref: "Tags",
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tasks", taskSchema);
