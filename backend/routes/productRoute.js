const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "products",
  filename: function (req, file, cb) {
    const name = Date.now() + ".png";
    cb(null, name);
  },
});

const upload = multer({
  storage: storage,
});

const {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  addReview,
  getProductsCount,
} = require("../controllers/productController");
const { isLoggedIn, isAdmin } = require("../middlewares/user");

router
  .route("/admin/createProduct")
  .post(isLoggedIn, isAdmin, upload.array("files", 10), createProduct);

router.route("/getAllProducts").get(isLoggedIn, getAllProducts);

router.route("/product/:productId").get(isLoggedIn, getProduct);

router
  .route("/admin/product/:productId")
  .put(isLoggedIn, isAdmin, upload.array("files", 10), updateProduct)
  .delete(isLoggedIn, isAdmin, deleteProduct);

router.route("/addReview").put(isLoggedIn, addReview);

router
  .route("/admin/getProductsCount")
  .get(isLoggedIn, isAdmin, getProductsCount);

module.exports = router;
