const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password, house } = req.body;
      
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists. Try logging in." });

      if (password.length < 8)
        return res
          .status(400)
          .json({ msg: "Password should be at least 8 characters long." });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        house: house
      });

      // Save mongodb
      await newUser.save();

      // Then create jsonwebtoken to authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2d
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password,remem } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "The Email is not registered. Register and try again." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "The Password is incorrect. Try again or Click on Forgot password." });

      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });
      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          num_login: user.num_login+1,
        }
      );
      if(remem){
        m_age = 12 * 24 * 60 * 60 * 1000
      }
      else{
        m_age = 1 * 24 * 60 * 60 * 1000
      }
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: m_age, // 7d
      });

      res.json({ accesstoken });
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  forgotpass: async (req, res) => {
    try {
      const {
        email
      } = req.body;
      const user = await Users.findOne({ email }).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  changepass: async (req, res) => {
    try {
      const {
        password,
        newpassword
      } = req.body;
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "The Password is incorrect. Try again or Click on Forgot password." });
      const passwordHash = await bcrypt.hash(newpassword, 14);
      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          password: passwordHash,
        }
      );
      res.json("Password changed Successfully!");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updatepass: async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;
      const user = await Users.findOne({ email }).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const passwordHash = await bcrypt.hash(password, 14);
      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          password: passwordHash,
        }
      );
      res.json({msg:"Successfully updated the password."});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  sethouse: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          house: req.body.house,
        }
      );

      return res.json({ msg: "The house has been updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  userupdate : async (req,res) => {
    try{
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await Users.findOneAndUpdate({ _id: req.user.id },
        { work_duration: req.body.work_duration,
          short_break_duration: req.body.short_break_duration,
          long_break_duration: req.body.long_break_duration,
          autochange: req.body.autochange
        }
      );

      return res.json({ msg: "The user has been updated" });
    } catch {
      return res.status(500).json({ msg: err.message });
    }
  }
};

const createAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = user => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = userController;
