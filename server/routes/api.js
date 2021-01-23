const express = require("express");
var cors = require("cors");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const Cart = require("../models/cart");

router.get("/products", (req, res, next) => {
  Product.find().then((products) => {
    res.json(products);
  });
});

router.post("/products", async (req, res, next) => {
  try {
    const promises = req.body.products.map((updatedProduct) => {
      return Product.findById(updatedProduct._id).then((product) => {
        product.quantity = updatedProduct.quantity;
        return product.save();
      });
    });
    await Promise.all(promises);
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    return next(error);
  }
});

router.get("/cart", async (req, res, next) => {
  try {
    if (req.session.cartId) {
      const cart = await Cart.findById(req.session.cartId);
      res.json(cart);
    } else {
      const cart = new Cart({
        items: [],
      });

      const newCart = await cart.save();
      req.session.cartId = newCart._id;
      res.json(newCart);
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/cart", async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.session.cartId,
      {
        items: req.body.cart,
      },
      { new: true }
    );
    res.json(updatedCart);
  } catch (error) {
    return next(error);
  }
});

router.post("/checkout", async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.session.cartId);
    const checkoutPromises = cart.items.map((cartItem) => {
      return Product.findById(cartItem._id).then((product) => {
        product.quantity -= cartItem.quantity;
        return product.save();
      });
    });
    await Promise.all(checkoutPromises);
    const products = await Product.find();
    cart.items = [];
    await cart.save();
    res.json({ products, cart });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
