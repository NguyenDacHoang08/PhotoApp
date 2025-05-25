const express = require("express");
const router = express.Router();
const Photo = require("../db/photoModel");
const User = require("../db/userModel");

// GET /api/comment/user/:id
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const photos = await Photo.find({ "comments.user_id": userId })
      .select("_id file_name comments")
      .lean();

    const commentsByUser = [];

    for (let photo of photos) {
      for (let comment of photo.comments) {
        if (String(comment.user_id) === userId) {
          commentsByUser.push({
            photo_id: photo._id,
            photo_file_name: photo.file_name,
            comment: comment.comment,
            date_time: comment.date_time,
          });
        }
      }
    }

    res.status(200).json(commentsByUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments by user" });
  }
});

module.exports = router;
