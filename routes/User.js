const User = require("../models/User"); //schema post
const router = require("express").Router();
const bcrypt = require("bcrypt");

// requests

// this is for a post request

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// login end point

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("user does not exist!");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated) {
      return res.status(400).json("Wrong password!");
    }

    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
