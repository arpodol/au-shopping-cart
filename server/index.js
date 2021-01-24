const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const apiRoutes = require("./routes/api");
const MongoStore = require("connect-mongo")(session);
const Product = require("./models/product");
const data = require("./data");

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

app.use("/api", apiRoutes);

const seedProducts = async (data) => {
  const products = await Product.find();
  if (products.length === 0) {
    await Product.insertMany(data);
  }
};

app.listen(port, () => {
  seedProducts(data);
  console.log(`Server running on port ${port}`);
});
