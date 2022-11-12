const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const Razorpay = require("razorpay");
const crypto = require("crypto");

exports.createOrder = async (req, res, next) => {
  try {
    const { products, shippingAddress, amount, paymentmode } = req.body;

    const order = await Order.create({
      products,
      user: req.user._id,
      shippingAddress,
      amount,
      paymentmode,
    });

    const user = await User.findById(req.user._id);

    user.orders.push(order);

    user.mycart = [];
    user.totalCartAmount = 0;

    await user.save();

    products.forEach(async (item) => {
      const product = await Product.findById(item.product);

      product.quantity = product.quantity - item.quantity;

      await product.save();
    });

    req.order = order;

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(404).json({
        msg: "Orderid is missing",
      });
    }

    const order = await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      msg: "Order delete success",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(404).json({
        msg: "Orderid is missing",
      });
    }

    const order = await Order.findById(orderId);

    res.status(200).json({
      msg: "Order fetched success",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(404).json({
        msg: "Orderid is missing",
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: req.body.status },
      {
        runValidators: false,
        new: true,
      }
    );

    res.status(200).json({
      msg: "Updated order status",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.createPaymentOrder = async (req, res, next) => {
  try {
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await Order.findById(req.order._id);

    const { amount, currency, receipt } = req.body;

    instance.orders.create(
      {
        amount,
        currency,
        receipt,
      },
      async function (err, payorder) {
        if (err) {
          return res.status(400).json({
            msg: "Error in creating order",
          });
        }

        res.status(200).json({
          msg: "Order Placed Successfully",
          order,
          razorpay: payorder,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.verifySignature = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      user_order_id,
    } = req.body;

    const order = await Order.findById(user_order_id);

    var generated_signature = crypto
      .createHmac("SHA256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature == razorpay_signature) {
      order.paymentDetails = {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      };

      order.paymentStatus = "paid";

      await order.save();

      res.status(200).json({ msg: "payment is successful" });
    } else {
      res.status(404).json({
        msg: "payment failed",
        reason: "Signature didn't match",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    res.status(200).json({
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.getSingleUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.getOrderCount = async (req, res) => {
  try {
    const orderscount = await Order.find({}).count();

    res.status(200).json({
      msg: "Total orders count",
      orderscount,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};
