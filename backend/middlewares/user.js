const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({
        msg: "Authorization missing",
      });
    }

    const token = req.header("Authorization").replace("Bearer ", "");

    // console.log(token);

    if (token == "Bearer") {
      return res.status(401).json({
        msg: "Token is missing",
      });
    }

    const decode = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        msg: "No user found with the id",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (user.role == "admin") {
    next();
  } else {
    return res.status(401).json({
      msg: "You're not authorized",
    });
  }
};
