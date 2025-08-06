import Order from "../models/order.model.js";
import asyncHandler from "express-async-handler";

// CREATE ORDER
const createOrder = asyncHandler(async (req, res) => {
  const newOrder = Order(req.body);
  const savedOrder = await newOrder.save();
  if (!savedOrder) {
    res.status(400);
    throw new Error("Order was not created");
  } else {
    res.status(200).json(savedOrder);
  }
});

// UPDATE ORDER
const updateOrder = asyncHandler(async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updateOrder) {
    res.status(400);
    throw new Error("Order was not updated");
  } else {
    res.status(200).json(updatedOrder);
  }
});

//DELETE ORDER
const deleteOrder = asyncHandler(async () => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    res.status(400);
    throw new Error("Order was not deleted");
  } else {
    res.status(200).json("order is deleted successfully");
  }
});

// GET USER ORDERS
const getUserOrder = asyncHandler(async (req, res) => {
  const orders = await (await Order.find({ userId: req.params.id })).reverse();
  if (!orders) {
    res.status(400);
    throw new Error("Order was not found");
  } else {
    res.status(200).json(orders);
  }
});

// GET ALL ORDERS
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await (await Order.find()).reverse();
  if (!orders) {
    res.status(400);
    throw new Error("No orders found");
  } else {
    res.status(200).json(orders);
  }
});

// GET ORDER STATS

const getOrderStats = asyncHandler(async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const income = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },

    {
      $project: {
        month: { $month: "$createdAt" },

        sales: "$amount",
      },
    },

    {
      $group: {
        _id: "$month",

        total: { $sum: "$sales" },
      },
    },
  ]);

  res.status(200).json(income);
});

export {getAllOrders,getOrderStats,updateOrder,deleteOrder, getUserOrder,createOrder};