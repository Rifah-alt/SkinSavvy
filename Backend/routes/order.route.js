import express from "express";
const router = express.Router();
import {
  createOrder,
  updateOrder,
  getAllOrders,
  getOrderStats,
  deleteOrder,
  getUserOrder,
} from "../controllers/order.controller.js";

// CREATE ORDER ROUTE
router.post("/", createOrder);
//UPDATE ORDER ROUTE
router.put("/:id", updateOrder);
//GET ALL ORDERS ROUTE
router.get("/", getAllOrders);
// GET ORDER STATS ROUTE
router.get("/stats", getOrderStats);
// DELETE ORDER ROUTE
router.delete("/:id", deleteOrder);
//GET USER ORDERS ROUTE
router.get("/find/:id", getUserOrder);

export default router;