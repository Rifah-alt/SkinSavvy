import express from "express";
import {
  registerUser,
  loginUser,
  logOut,
} from "../controllers/auth.controller.js";
const router = express.Router();

// REGISTER ROUTE
router.post("/register", registerUser);

//LOGIN ROUTE
router.post("/login", loginUser);

// LOGOUT
router.get("/logout", logOut);

export default router;