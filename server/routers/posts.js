import express from "express";
import passport from "passport";
import "../config/passport.js";

import { createPost, getPosts, getPost } from "../controllers/posts.js";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createPost
);

router.get(
  "/posts",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err)
        res
          .status(500)
          .json({ message: { msg: "Bir hata oluştu", msgError: true } });
      if (!user) {
        res.locals.authenticated = false;
        next();
      } else {
          res.locals.authenticated = true;
          next();}
    })(req, res, next);
  },
  getPosts
);

router.get("/post", getPost);

export default router;
