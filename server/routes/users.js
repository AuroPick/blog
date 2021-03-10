import express from "express";
import passport from "passport";
import "../auth/passport.js";

import {
  register,
  login,
  logout,
  admin,
  authenticated,
  getUsers,
  deleteUser,
} from "../controllers/users.js";

const router = express.Router();

router.post("/register", register);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.get("/logout", passport.authenticate("jwt", { session: false }), logout);

router.get("/admin", passport.authenticate("jwt", { session: false }), admin);

router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  authenticated
);

router.get("/get", passport.authenticate("jwt", { session: false }), getUsers);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

export default router;
