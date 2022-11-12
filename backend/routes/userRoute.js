const express = require("express");
const {
  signup,
  signin,
  resetPassword,
  getUserData,
  addToCart,
  getCartItems,
  addToWishlist,
  getWishlist,
  addAddress,
  getUsersCount,
  verifyIsTokenValid,
  getOtp,
  otpLogin,
} = require("../controllers/userController");
const { isLoggedIn, isAdmin } = require("../middlewares/user");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/resetpassword").post(resetPassword);
router.route("/getUserData").get(isLoggedIn, getUserData);

router
  .route("/addProductToCart/:productId/:quantity")
  .put(isLoggedIn, addToCart);

router.route("/getCartItems").get(isLoggedIn, getCartItems);

router.route("/addToWishlist/:productId").put(isLoggedIn, addToWishlist);

router.route("/getWishlistItems").get(isLoggedIn, getWishlist);

router.route("/addAddress").put(isLoggedIn, addAddress);

router.route("/admin/getUsersCount").get(isLoggedIn, isAdmin, getUsersCount);

router.route("/isValidToken").get(verifyIsTokenValid);

router.route("/getOtp").post(getOtp);
router.route("/verifyOtp").post(otpLogin);

module.exports = router;
