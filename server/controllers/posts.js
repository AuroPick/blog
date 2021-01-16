import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";

const router = express.Router();

export const createPost = (req, res) => {
  const { title, message, creator, specialPost } = req.body;

  const post = new Post({ title, message, creator, specialPost });

  post.save((err) => {
    if (err)
      res
        .status(500)
        .json({ message: { msg: "Bir hata oluştu", msgError: true } });
    else
      res.status(201).json({
        message: { msg: "Gönderi başarıyla oluşturuldu", msgError: false },
      });
  });
};

export const getPosts = (req, res) => {
  if (!res.locals.authenticated) {
    Post.find({ specialPost: false })
      .sort({ createdAt: -1 })
      .exec((err, posts) => {
        if (err)
          res
            .status(500)
            .json({ message: { msg: "Bir hata oluştu", msgError: true } });
        else res.status(200).json({ posts, authenticated: false });
      });
  } else {
    Post.find()
      .sort({ createdAt: -1 })
      .exec((err, posts) => {
        if (err)
          res
            .status(500)
            .json({ message: { msg: "Bir hata oluştu", msgError: true } });
        else res.status(200).json({ posts, authenticated: true });
      });
  }
};

export const getPost = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res
      .status(404)
      .json({ message: { msg: "Böyle bir gönderi yok", msgError: true } });
  else {
    Post.findById(id).exec((err, posts) => {
      if (err)
        res
          .status(500)
          .json({ message: { msg: "Bir hata oluştu", msgError: true } });
      if (res.locals.authenticated)
        res.status(200).json({ posts, authenticated: true });
      else {
        if (posts.specialPost)
          res.status(200).json({
            message: {
              msg: "Bu gönderiyi görüntülemek için yetkiniz yok",
              msgError: true,
            },
          });
        else res.status(200).json({ posts, authenticated: false });
      }
    });
  }
};

export const deletePost = (req, res) => {
  const { id } = req.params;

  if (req.user.role === "admin") {
    if (!mongoose.Types.ObjectId.isValid(id))
      res
        .status(404)
        .json({ message: { msg: "Böyle bir gönderi yok", msgError: true } });
    else {
      Post.findByIdAndRemove(id).exec((err, post) => {
        if (err || post === null)
          res
            .status(500)
            .json({ message: { msg: "Bir hata oluştu", msgError: true } });
        else {
          res.status(200).json({
            message: { msg: "Başarıyla silindi", msgError: false, post },
          });
        }
      });
    }
  } else
    res
      .status(403)
      .json({ message: { msg: "Admin değilsiniz", msgError: true } });
};

export const updatePost = (req, res) => {
  const { id } = req.params;
  const { title, message, creator, specialPost } = req.body;

  if (req.user.role === "admin") {
    if (!mongoose.Types.ObjectId.isValid(id))
      res
        .status(404)
        .json({ message: { msg: "Böyle bir gönderi yok", msgError: true } });
    else {
      Post.findByIdAndUpdate(id, {
        title,
        message,
        creator,
        specialPost,
        _id: id,
      }).exec((err, post) => {
        if (err || post === null)
          res
            .status(500)
            .json({ message: { msg: "Bir hata oluştu", msgError: true } });
        else {
          res.status(200).json({
            message: { msg: "Başarıyla güncellendi", msgError: false, post },
          });
        }
      });
    }
  } else
    res
      .status(403)
      .json({ message: { msg: "Admin değilsiniz", msgError: true } });
};

export default router;
