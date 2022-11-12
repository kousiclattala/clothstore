const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DB got Connected...");
    })
    .catch((err) => {
      console.log("err in conecting to db");
    });
};

module.exports = connectToDB;
