const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    minLength: [6, "Product name should be of min 6 characters long"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    enum: ["men", "women", "kids"],
    required: [true, "Please specify category of the product"],
  },
  images: [
    {
      name: {
        type: String,
        required: [true, "Product name is required"],
      },
      imageUrl: {
        type: String,
        required: [true, "Product image url is required"],
      },
    },
  ],
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
