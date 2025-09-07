import mongoose from "mongoose";
const CartSchema = mongoose.Schema(
  {
    quantity: { type: Number, required: true},
    total: {
      type: Number,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    userId: {
        type: String,
        required: true,
      },
  },

  { timestamps: true }
);
const cart = mongoose.model("Cart", CartSchema);
export default cart;