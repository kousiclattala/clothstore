const User = require("../models/userModel");
const Product = require("../models/productModel");
const bcrypt = require("bcrypt");
const { getTotalCartAmount } = require("../utils/userFunctions");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, phonenumber } = req.body;

    if (!name || !email || !password || !phonenumber) {
      return res.status(400).json({
        msg: "Please include all fields",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phonenumber,
    });

    await user.save();

    const token = await user.generateToken();

    user.password = undefined;

    res.status(200).json({
      msg: "User created success",
      user,
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({
        msg: "Email/Phone number is registered, please login",
        error,
      });
    } else {
      return res.status(500).json({
        msg: "Server error",
        error: error.message,
      });
    }
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Please enter email/password",
      });
    }

    const user = await User.find({ email: email }).select("+password");

    if (user.length == 0) {
      return res.status(404).json({
        msg: "Not a registered user, Please register!",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user[0].password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        msg: "Email or Password is incorrect",
      });
    }

    const token = await user[0].generateToken();
    user[0].password = undefined;

    res.status(200).json({
      msg: "Logged in success",
      user: user[0],
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

exports.getOtp = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    const user = await User.find({ phonenumber: phoneNumber });

    if (user.length == 0) {
      return res.status(404).json({
        msg: "No user found, Please register",
      });
    }

    var otp = Math.floor(Math.random() * 10000 + 10000)
      .toString()
      .substring(1);

    user[0].otp = otp;

    await user[0].save();

    res.status(200).json({
      msg: "Otp sent Successfully",
      otp: otp,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.otpLogin = async (req, res, next) => {
  try {
    const { phoneNumber, otp } = req.body;

    const user = await User.find({ phonenumber: phoneNumber });

    if (user.length == 0) {
      return res.status(404).json({
        msg: "No user found, Please register",
      });
    }

    if (user[0].otp === otp) {
      user[0].otp = "0";

      await user[0].save();

      res.status(200).json({
        msg: "Otp verified",
      });
    } else {
      res.status(400).json({
        msg: "Invalid otp",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        msg: "Please enter email & password fileds",
      });
    }

    const user = await User.find({ email: email }).select("+password");

    if (user.length == 0) {
      return res.status(404).json({
        msg: "Not registered, please register!!",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user[0].password);

    if (isPasswordMatch) {
      return res.status(400).json({
        msg: "Old password & New password should not be same",
      });
    }

    user[0].password = password;

    await user[0].save();
    const token = await user[0].generateToken();

    user[0].password = undefined;

    res.status(200).json({
      msg: "Password reset success",
      user: user[0],
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

exports.getUserData = async (req, res, next) => {
  try {
    res.status(200).json({
      msg: "User data",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.params;

    if (!productId) {
      return res.status(404).json({
        msg: "Product Id is missing",
      });
    }

    const cart = {
      product: productId,
      quantity,
    };

    const user = await User.findById(req.user._id);

    user.mycart.push(cart);

    await user.save();

    res.status(200).json({
      msg: "Product added to cart",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.getCartItems = async (req, res, next) => {
  try {
    var cartAmount = 0;

    const user = await User.findById(req.user._id).populate("mycart.product");

    user.mycart.forEach(async (item) => {
      const product = await Product.findById(item.product);

      cartAmount = cartAmount + product.price * item.quantity;

      user.totalCartAmount = cartAmount;
    });
    await user.save();

    res.status(200).json({
      cartItems: user.mycart,
      totalCartAmount: user.totalCartAmount,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(404).json({
        msg: "Product Id is missing",
      });
    }

    const wishlist = {
      product: productId,
    };

    const user = await User.findById(req.user._id);

    user.wishlist.push(wishlist);

    await user.save();

    res.status(200).json({
      msg: "Product added to Wishlist",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist.product");

    res.status(200).json({
      wishlist: user.wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.addAddress = async (req, res, next) => {
  try {
    const { name, flatno, landmark, city, state, country, postalcode } =
      req.body;

    const address = {
      name,
      flatno,
      landmark,
      city,
      state,
      country,
      postalcode,
    };

    const user = await User.findById(req.user._id);

    user.address.push(address);

    await user.save();

    res.status(200).json({
      msg: "Address Added Successfully",
      address: user.address,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.getUsersCount = async (req, res, next) => {
  try {
    const usersCount = await User.find({}).count();

    res.status(200).json({
      msg: "Total users count",
      usersCount,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.verifyIsTokenValid = async (req, res, next) => {
  try {
    var decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

    res.status(200).json({
      msg: "Token valid",
      isValidToken: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Token Expired",
      isValidToken: false,
    });
  }
};
