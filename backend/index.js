require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const connectToDB = require("./database");

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

app.use(cors());
app.use(express.json());
app.use(express.static("products"));

//middlewares
app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);

//connecting to db
connectToDB();

//listening to server
app.listen(process.env.PORT, () => {
  console.log(`Server started in Port: ${process.env.PORT}...`);
});
