import express from "express";
import mongoose from "mongoose";

import Post from "../models/posts.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ specialPost: false })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, message, creator } = req.body;

  const newPost = new Post({
    title,
    message,
    creator,
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`Bu id ile post yok: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post başarıyla silindi." });
};

export const getSpecialPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).exec();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
