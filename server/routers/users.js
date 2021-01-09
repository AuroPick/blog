import { Router as router} from "express";
import { register, login, logout, admin, authenticated } from "../controllers/users.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/admin", admin);
router.get("/authenticated", authenticated);