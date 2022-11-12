const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
    minLength: [4, "name should be of minimum 4 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
  },
  phonenumber: {
    type: String,
    required: [true, "Phone number is required"],
    minLength: [10, "Phone number should be of min 10 characters long"],
    unique: [true, "Phone number is registered, please login"],
  },
  otp: {
    type: String,
    default: "0",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password should be of minimum 6 characters long"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "order",
    },
  ],
  mycart: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalCartAmount: {
    type: Number,
    default: 0,
  },
  wishlist: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    },
  ],
  address: [
    {
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
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateToken = function () {
  var token = jwt.sign({ id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });

  return token;
};

module.exports = mongoose.model("User", userSchema);
