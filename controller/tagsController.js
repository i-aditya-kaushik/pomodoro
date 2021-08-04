const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tags = require("../models/tagsModel")

const tagsController = {
    addtags: async (req, res) => {
        try {
          const user = await Users.findById(req.user.id);
          if (!user) return res.status(400).json({ msg: "User does not exist." });
    
          const { name } = req.body;
          const tag = await Tags.findOne({ name });
          if (tag)
              return res.status(400).json({ msg: "This category already exists." });

          const newTag = new Tags({ name });

          await newTag.save();

          await Users.findOneAndUpdate(
            { _id: req.user.id },
            {
              $push: {tags: newTag},
            }
          );

          return res.json({ msg: "Added to Tags list" });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },
    
  tagupdate: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {tags: req.body.tags},
        }
      );

      return res.json({ msg: "Updated user tags" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};




module.exports = tagsController;