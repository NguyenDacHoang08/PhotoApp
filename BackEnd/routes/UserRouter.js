const express = require("express");
const router = express.Router();
const User = require("../db/userModel");

// GET /api/user/list
router.get("/list", async (req, res) =>{
  try{
    const users = await User.find();
    res.status(200).json(users);
  }
  catch(err){
    res.status(400).json({Error: "Something went wrong!"})
  }
});

// GET api/user/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user){
      res.status(200).json(user);
    }
    else{
      res.status(404).json({error: "Can't find user"});
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid user ID or server error" });
  }
});

module.exports = router;
