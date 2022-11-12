const app = require("express");
const router = app.Router();
const { isLoggedIn, isAdmin } = require("../middlewares/user");
const {
  createOrder,
  deleteOrder,
  getSingleOrder,
  updateOrderStatus,
  createPaymentOrder,
  verifySignature,
  getAllOrders,
  getSingleUserOrders,
  getOrderCount,
} = require("../controllers/orderController");

router.route("/createOrder").post(isLoggedIn, createOrder, createPaymentOrder);
router.route("/verifysignature").post(isLoggedIn, verifySignature);

router.route("/admin/getAllOrders").get(isLoggedIn, isAdmin, getAllOrders);
router.route("/getUserOrders").get(isLoggedIn, getSingleUserOrders);

router.route("/order/:orderId").get(isLoggedIn, getSingleOrder);

router
  .route("/admin/order/:orderId")
  .put(isLoggedIn, isAdmin, updateOrderStatus)
  .delete(isLoggedIn, isAdmin, deleteOrder);

router.route("/admin/getOrdersCount").get(isLoggedIn, isAdmin, getOrderCount);

module.exports = router;
