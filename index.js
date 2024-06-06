const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const AuthRoutes = require("./Routes/AuthRoutes.js");
const AccountRoutes = require("./Routes/AccountRoutes.js");
const app = express();

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", AuthRoutes);
app.use("/account", AccountRoutes);

const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGODB_AUTH_URL);
  console.log("Connected to MongoDB");
};
connectToMongo();

app.listen(8000, () => {
  console.log("sever is running");
});
