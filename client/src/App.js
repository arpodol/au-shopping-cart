import React from "react";
import "semantic-ui-css/semantic.min.css";
import ShoppingCart from "./components/ShoppingCart";
import ProductList from "./components/ProductList";
import { Container, Button, Divider } from "semantic-ui-react";

class App extends React.Component {
  state = {
    products: [],
    cart: [],
    warning: "",
  };

  componentDidMount() {
    fetch("/api/products", { mode: "cors" })
      .then((response) => response.json())
      .then((products) => this.setState({ products }));
    fetch("/api/cart", { mode: "cors" })
      .then((response) => response.json())
      .then((cart) => this.setState({ cart: cart.items }));
  }

  removeFromCart = (productId) => {
    let cart = this.state.cart.slice();
    const index = cart.findIndex(
      (cartProduct) => cartProduct._id === productId
    );

    if (index >= 0) {
      const cartProduct = cart[index];
      cart[index] = Object.assign({}, cartProduct, {
        quantity: cartProduct.quantity - 1,
      });
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }

    fetch(`/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    }).then((response) => response.json());

    this.setState({
      cart,
      warning: "",
    });
  };

  addToCart = (productId) => {
    const product = this.state.products.find((product) => {
      return product._id === productId;
    });

    let cart = this.state.cart.slice();

    const index = cart.findIndex(
      (cartProduct) => cartProduct._id === product._id
    );

    if (product.quantity === 0) return;

    if (index >= 0) {
      const cartProduct = cart[index];
      if (cartProduct.quantity >= product.quantity) {
        this.setState({ warning: "!Not enough in stock!" });
        return;
      }
      cart[index] = Object.assign({}, cartProduct, {
        quantity: cartProduct.quantity + 1,
      });
    } else {
      const cartProduct = Object.assign({}, product, { quantity: 1 });
      cart = this.state.cart.concat(cartProduct);
    }

    fetch(`/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    }).then((response) => response.json());

    this.setState({
      cart,
      warning: "",
    });
  };

  onCheckout = async () => {
    const response = await fetch(`/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const body = await response.json();
    this.setState({
      cart: body.cart.items,
      products: body.products,
      warning: "",
    });
  };

  onRestock = async () => {
    let products = this.state.products.slice();
    products.forEach((product) => {
      product.quantity += 5;
    });

    const response = await fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    });
    const body = await response.json();
    this.setState({ products: body.products, warning: "" });
  };

  render() {
    return (
      <main>
        <Container>
          {this.state.warning ? <h3>{this.state.warning}</h3> : null}
          <ShoppingCart
            cart={this.state.cart}
            onCheckout={this.onCheckout}
            onAddProduct={this.addToCart}
            onRemoveProduct={this.removeFromCart}
          />
          <ProductList
            products={this.state.products}
            onCartClick={this.addToCart}
          />
          <Divider />
          <Button basic color="green" onClick={this.onRestock}>
            Restock Products
          </Button>
        </Container>
      </main>
    );
  }
}
export default App;
