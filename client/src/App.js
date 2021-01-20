import React from "react";
import "semantic-ui-css/semantic.min.css";
import ShoppingCart from "./components/ShoppingCart";
import ProductList from "./components/ProductList";
import { Container } from "semantic-ui-react";

class App extends React.Component {
  state = {
    products: [],
    cart: [],
  };

  componentDidMount() {
    fetch("/api/products", { mode: "cors" })
      .then((response) => response.json())
      .then((products) => this.setState({ products }));
  }

  addToCart = (product) => {
    let cart = this.state.cart.slice();
    const index = cart.findIndex(
      (cartProduct) => cartProduct._id === product._id
    );

    const products = this.state.products.map((storeProduct) => {
      if (storeProduct._id === product._id) storeProduct.quantity -= 1;
      return storeProduct;
    });

    if (index >= 0) {
      product = cart[index];
      cart[index] = Object.assign({}, product, {
        quantity: product.quantity + 1,
      });
    } else {
      product = Object.assign({}, product, { quantity: 1 });
      cart = this.state.cart.concat(product);
    }

    this.setState({
      products,
      cart,
    });
  };

  onCheckout = () => {};

  render() {
    return (
      <main>
        <Container>
          <ShoppingCart cart={this.state.cart} onCheckout={this.onCheckout} />
          <ProductList
            products={this.state.products}
            onCartClick={this.addToCart}
          />
        </Container>
      </main>
    );
  }
}
export default App;
