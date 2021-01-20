const express = require("express");
const apiRoutes = require("./routes/api");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Product = require("./models/product");

const connectionString = "mongodb://mongo:27017/artifact";

const app = express();
app.use(cookieParser());
const port = 5000;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

const data = [
  {
    title: "Photobook",
    quantity: 3,
    price: 39.99,
  },
  {
    title: "Get Well Card",
    quantity: 1,
    price: 9.99,
  },
  {
    title: "Thank You Cards(30)",
    quantity: 2,
    price: 29.99,
  },
  {
    title: "Candle",
    quantity: 12,
    price: 5.34,
  },
];

const seedProducts = async () => {
  const products = await Product.find();
  if (products.length === 0) {
    await Product.insertMany(data);
  }
};

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
