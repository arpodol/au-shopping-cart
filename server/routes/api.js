const express = require("express");
var cors = require("cors");
const router = express.Router();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get("/products", (req, res, next) => {
  console.log("Cookies: ", req.cookies);
  Product.find().then((products) => res.json(products));
});

module.exports = router;
