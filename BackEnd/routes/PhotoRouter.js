const express = require("express");
const router = express.Router();
const Photo = require("../db/photoModel");
const User = require("../db/userModel");

// GET /api/photo/photoOfUser/:id
router.get("/photoOfUser/:id", async (req, res) => {
  try {
    const photos = await Photo.find({ user_id: req.params.id })
      .select("_id user_id comments file_name date_time")
      .lean();

    for (let photo of photos) {
      for (let comment of photo.comments) {
        const commenter = await User.findById(comment.user_id)
          .select("_id first_name last_name")
          .lean();
        comment.user = commenter;
        delete comment.user_id;
      }
    }

    res.status(200).json(photos);
  } catch (err) {
    res.status(400).json({ error: "Invalid user ID or server error" });
  }
});

module.exports = router;
