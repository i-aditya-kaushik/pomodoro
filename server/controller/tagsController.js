const Users = require("../models/userModel");
const Tags = require("../models/tagsModel")

const tagsController = {
    addtags: async (req, res) => {
        try {
          const user = await Users.findById(req.user.id);
          if (!user) return res.status(400).json({ msg: "User does not exist." });
          const { name } = req.body;
          const tag = await Tags.findOne({ name });
          const newTag = new Tags({ name });
          if (tag){
            if(user.tags.indexOf(tag.id)==-1){
            await Users.findOneAndUpdate(
              { _id: req.user.id },
              {
                $push: {tags: tag},
              }
              );
            }
            return res.json({ msg: "Already existing tag added to user." });
          }

          await newTag.save();

          await Users.findOneAndUpdate(
            { _id: req.user.id },
            {
              $push: {tags: newTag},
            }
          );

          return res.json({ msg: "New tag given to the user." });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },
    addmultipletags: async (req, res) => {
      try {
        const user = await Users.findById(req.user.id);
        if (!user) return res.status(400).json({ msg: "User does not exist." });
        const { newValue } = req.body;
        for(var i=0;i<newValue.length;i++){
          var name = newValue[i].name
          if(typeof(name)=='undefined'){
              name = newValue[i]
          }
          const tag = await Tags.findOne({ name });
          const newTag = new Tags({ name });
          if (tag){
            if(user.tags.indexOf(tag.id)==-1){
            await Users.findOneAndUpdate(
              { _id: req.user.id },
              {
                $push: {tags: tag},
              }
              );
            }
          }
          
          else {
            await newTag.save();
            await Users.findOneAndUpdate(
              { _id: req.user.id },
              {
                $push: {tags: newTag},
              }
            );
          }

        }
        return res.json({ msg: "Tags given to the user." });
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

  gettags: async (req,res) => {
    try{
      const tags = await Tags.find().select("name")
      return res.json({tags: tags})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  gettaguser: async (req,res) => {
    try{
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const tags = await Users.findById(req.user.id).populate('tags').select("tags")
      return res.json({tags: tags.tags})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deletetags : async (req,res) => {
    try{
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          tags: [],
        }
      );
      return res.json({tags: user.tags})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};




module.exports = tagsController;