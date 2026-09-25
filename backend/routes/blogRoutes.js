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
// Get single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    res.json(blog);
  } catch (error) {
    console.error("Get single blog error:", error);

    res.status(500).json({
      message: "Server error while fetching blog.",
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
// Delete blog
router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    // Only the author can delete the blog
    if (blog.authorId.toString() !== req.user.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this blog.",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    res.status(500).json({
      message: "Server error while deleting blog.",
      error: error.message,
    });
  }
});
// Update blog
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, body } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    // Only the author can edit the blog
    if (blog.authorId.toString() !== req.user.toString()) {
      return res.status(403).json({
        message: "You are not allowed to edit this blog.",
      });
    }

    if (!title || !body) {
      return res.status(400).json({
        message: "Please provide title and body.",
      });
    }

    blog.title = title;
    blog.body = body;

    const updatedBlog = await blog.save();

    res.json({
      message: "Blog updated successfully.",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);

    res.status(500).json({
      message: "Server error while updating blog.",
      error: error.message,
    });
  }
});

module.exports = router;
