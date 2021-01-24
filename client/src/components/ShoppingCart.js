import React from "react";
import { total } from "../helpers";
import { Menu, Button } from "semantic-ui-react";

function ShoppingCart({ cart, onCheckout, onAddProduct, onRemoveProduct }) {
  if (cart.length === 0) {
    return (
      <Menu>
        <div>
          <h2>Your Cart</h2>
          <h3>Your cart is empty</h3>
          <p>Total: $0</p>
          <Button primary disabled>
            Checkout
          </Button>
        </div>
      </Menu>
    );
  } else {
    return (
      <Menu>
        <h2>Your Cart</h2>
        <table className="cart-items">
          <tbody>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
            {cart.map((product, i) => {
              return (
                <tr key={i}>
                  <td>{product.title}</td>
                  <td>{product.quantity}</td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                  <td>
                    <Button onClick={() => onRemoveProduct(product._id)}>
                      -
                    </Button>
                    <Button onClick={() => onAddProduct(product._id)}>+</Button>
                  </td>
                </tr>
              );
            })}

            <tr>
              <td colSpan="3" className="total">
                Total: ${total(cart)}
              </td>
              <td>
                <Button primary onClick={onCheckout}>
                  Checkout
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Menu>
    );
  }
}

export default ShoppingCart;
