import express from "express";
import JWT from "jsonwebtoken";
import "dotenv/config.js";
import mongoose from "mongoose";

import User from "../models/user.js";

const router = express.Router();

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "Aykut",
      sub: userID,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export const register = (req, res) => {
  const { email, username, password } = req.body;

  User.findOne({ $or: [{ email }, { username }] }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msg: "Bir hata oluştu", msgError: true } });

    if (user)
      res.status(400).json({
        message: { msg: "Bu email ve kullanıcı adı alınmış", msgError: true },
      });
    else {
      const newUser = new User({ email, username, password });

      newUser.save((err) => {
        if (err)
          res
            .status(500)
            .json({ message: { msg: "Bir hata oluştu", msgError: true } });
        else
          res.status(201).json({
            message: {
              msg: "Hesabınız başarıyla oluşturuldu",
              msgError: false,
            },
          });
      });
    }
  });
};

export const login = (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username, role } = req.user;
    const token = signToken(_id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ user: { username: "", role: "" }, success: true });
};

export const admin = (req, res) => {
  if (req.user.role === "admin")
    res.status(200).json({
      message: { msg: "Admin olduğunuz doğrulandı", msgError: false },
    });
  else
    res
      .status(403)
      .json({ message: { msg: "Admin değilsiniz", msgError: true } });
};

export const authenticated = (req, res) => {
  const { username, role } = req.user;
  res.status(200).json({
    isAuthenticated: true,
    user: { username, role },
    message: { msgError: false },
  });
};

export const getUsers = (req, res) => {
  User.find()
    .sort({ role: 1 })
    .exec((err, users) => {
      res.status(200).json(users);
    });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  if (req.user.role === "admin") {
    if (!mongoose.Types.ObjectId.isValid(id))
      res
        .status(404)
        .json({ message: { msg: "Böyle bir kullanıcı yok", msgError: true } });
    else {
      User.findByIdAndRemove(id).exec((err) => {
        if (err)
          res
            .status(500)
            .json({ message: { msg: "Bir hata oluştu", msgError: true } });
        else {
          res.status(200).json({
            message: { msg: "Başarıyla silindi", msgError: false },
          });
        }
      });
    }
  } else {
    res
      .status(403)
      .json({ message: { msg: "Admin değilsiniz", msgError: true } });
  }
};

export default router;
