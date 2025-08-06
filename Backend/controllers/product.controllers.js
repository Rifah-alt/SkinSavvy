import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

// CREATE A PRODUCT
const createProduct = asyncHandler(async (req, res) => {
 
  const newProduct = Product(req.body);
  const product = await newProduct.save();
  if (product) {
    console.log(product)
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error("Product was not created");
  }
});

//UPDATED PRODUCT
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedProduct) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json(updatedProduct);
  }
});

//DELETE PRODUCT
const deleteProduct = asyncHandler(async () => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json("Product has been deleted!");
  }
});

// GET PRODUCT
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json(product);
  }
});

//GET ALL PRODUCTS

const getAllProducts = asyncHandler(async (req, res) => {
  const qNew = req.query.new;

  const qCategory = req.query.category;

  const qSearch = req.query.search;

  let products;

  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 });
  } else if (qCategory) {
    products = await Product.find({ categories: { $in: [qCategory] } });
  } else if (qSearch) {
    products = await Product.find({
      $text: {
        $search: qSearch,
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    });
  } else {
    products = await Product.find().sort({ createdAt: -1 });
  }

  res.status(200).json(products);
});

// RATING
const ratingProduct = asyncHandler(async (req, res) => {
  const { star, name, comment, postedBy } = req.body;
  if (star) {
    const postedRating = await Product.findByIdAndUpdate(
      req.params.productId,
      { $push: { ratings: { star, name, comment, postedBy }}},
      { new: true }
    );
    res.status(201).json(postedRating);
  }
});

export {ratingProduct, getAllProducts, getProduct,createProduct,updateProduct, deleteProduct};