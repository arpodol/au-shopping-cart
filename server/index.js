const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

const apiRoutes = require("./routes/api");
const MongoStore = require("connect-mongo")(session);

const Product = require("./models/product");

const connectionString = "mongodb://mongo:27017/artifact";

const app = express();
const port = 5000;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

const db = mongoose.connection;

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

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db }),
  })
);

const seedProducts = async () => {
  const products = await Product.find();
  if (products.length === 0) {
    await Product.insertMany(data);
  }
};

app.use("/api", apiRoutes);
app.listen(port, () => {
  seedProducts();
  console.log(`Server running on port ${port}`);
});
