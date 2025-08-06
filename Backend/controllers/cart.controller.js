import Cart from "../models/cart.model.js";
import asyncHandler from "express-async-handler";

// CREATE CART
const createCart = asyncHandler(async (req, res) => {
  const newCart = Cart(req.body);
  const savedCart = await newCart.save();
  if (!savedCart) {
    res.status(400);
    throw new Error("Cart was not created");
  } else {
    res.status(200).json(savedCart);
  }
});


//DELETE CART
const deleteCart = asyncHandler(async () => {
  const cart = await Cart.findByIdAndDelete(req.params.id);
  if (!cart) {
    res.status(400);
    throw new Error("Cart was not deleted");
  } else {
    res.status(200).json("Cart is deleted successfully");
  }
});

// GET USER ORDERS
const getUserCart = asyncHandler(async (req, res) => {
  const cart = await (await Cart.find({userId: req.body.userId })).reverse();
  if (!cart) {
    res.status(400);
    throw new Error("Cart was not found");
  } else {
    res.status(200).json(cart);
  }
});

// GET ALL CART
const getCarts = asyncHandler(async (req, res) => {
  const cart = await (await Cart.find()).reverse();
  if (!cart) {
    res.status(400);
    throw new Error("No cart found");
  } else {
    res.status(200).json(cart);
  }
});



export {getCarts,deleteCart, getUserCart, createCart};