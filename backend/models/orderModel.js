const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    flatno: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalcode: {
      type: String,
      required: true,
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["placed", "shipped", "delivered"],
    default: "placed",
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  paymentmode: {
    type: String,
    enum: ["netbanking", "upi", "card-payment", "cod"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentDetails: {
    type: Object,
    default: {},
  },
});

module.exports = mongoose.model("Order", orderSchema);
