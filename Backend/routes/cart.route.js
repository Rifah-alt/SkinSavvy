import express from "express";
const router = express.Router();
import {
    getCarts,
    getUserCart,
    deleteCart,
    createCart
  
} from "../controllers/cart.controller.js";

// CREATE CART ROUTE
router.post("/", createCart);

// DELETE CART
router.delete("/:id", deleteCart);

// GET USER CART
router.get("/:userId", getUserCart);

// GET CARTS
router.get("/", getCarts);



export default router;