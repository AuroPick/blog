import express from "express";

import {
  getPost,
  getPosts,
  getSpecialPosts,
  createPost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.get("/special-posts", getSpecialPosts);

export default router;
