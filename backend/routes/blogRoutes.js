const express = require("express");
const Blog = require("../models/Blog");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Test route
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.json(blogs);
  } catch (error) {
    console.error("Get blogs error:", error);

    res.status(500).json({
      message: "Server error while fetching blogs.",
      error: error.message,
    });
  }
});

// Create blog
router.post("/", protect, async (req, res) => {
  try {
    console.log("========== CREATE BLOG ==========");
    console.log("User ID from token:", req.user);
    console.log("Request body:", req.body);

    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        message: "Please provide title and body.",
      });
    }

    const user = await User.findOne({
      _id: req.user,
    });

    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        debugUserId: req.user,
      });
    }

    const blog = await Blog.create({
      title,
      body,
      author: user.username,
      authorId: user._id,
    });

    console.log("Blog created:", blog);

    res.status(201).json({
      message: "Blog created successfully.",
      blog,
    });
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    res.status(500).json({
      message: "Server error while creating blog.",
      error: error.message,
    });
  }
});

module.exports = router;
