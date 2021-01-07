import express from "express";
import mongoose from "mongoose";
import User from "../models/users.js";

import Users from "../models/users.js";

const router = express.Router();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email }).exec();

    if (!user)
      return res.status(400).json({ error: "Böyle bir kullanıcı yok." });

    if (user.password != password)
      return res.status(400).json({ error: "Parola eşleşmedi." });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { email, password, username } = req.body;

  const newUser = new User({
    email,
    password,
    username,
  });

  try {
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
