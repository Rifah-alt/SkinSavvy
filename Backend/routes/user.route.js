import express from "express";
import {
  updateUser,
  getAllUsers,
  getOneUser,
  getUsersStats,
  deleteUser,
} from "../controllers/user.controller.js";
const router = express.Router();

// UPDATE USER ROUTE
router.post("/", updateUser);

// GET ALL USERS ROUTE
router.get("/", getAllUsers);

// GET ONE USER ROUTE
router.put("/find/:id", getOneUser);

// GET USER STATISTICS ROUTE
router.get("/stats", getUsersStats);

// DELETE USER ROUTE
router.delete("/:id", deleteUser);

export default router;