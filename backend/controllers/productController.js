const Product = require("../models/productModel");

exports.createProduct = async (req, res, next) => {
  try {
    var productImgs = [];

    const imgs = req.files;

    console.log(req.body);

    // console.log(imgs);

    imgs.map((item) =>
      productImgs.push({
        name: item.filename,
        imageUrl: `${process.env.IMG_URL}/${item.filename}`,
      })
    );

    const { name, description, price, quantity, category } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      images: productImgs,
      user: req.user._id,
      quantity,
      category,
    });

    res.status(200).json({
      msg: "Product Created Successful",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      msg: "All Products",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        msg: "Product not found",
      });
    }

    res.status(200).json({
      msg: "Product Fetched",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    res.status(200).json({
      msg: "Product Deleted",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    console.log(req.body);

    const productImgs = [];
    const imgs = req.files;

    if (imgs.length > 0) {
      imgs.map((item) => {
        productImgs.push({
          name: item.filename,
          imageUrl: `${process.env.IMG_URL}/${item.filename}`,
        });
      });

      req.body.images = productImgs;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        msg: "Product not found",
      });
    }

    res.status(200).json({
      msg: "Product updated",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.addReview = async (req, res, next) => {
  try {
    var ratings = 0;

    const { productId, comment, rating } = req.body;

    const product = await Product.findById(productId);

    product.reviews.push({
      user: req.user._id,
      comment,
      rating,
    });

    product.totalRatings = product.totalRatings + 1;

    await product.save();

    product.reviews.forEach((review) => {
      ratings = ratings + review.rating;

      product.ratings = ratings / product.totalRatings;
    });

    await product.save();

    res.status(200).json({
      msg: "Successfully Added Your Review",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.getProductsCount = async (req, res, next) => {
  try {
    const productsCount = await Product.find({}).count();

    res.status(200).json({
      msg: "Total Products count",
      productsCount,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};
