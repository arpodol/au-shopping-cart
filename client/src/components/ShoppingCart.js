import React from "react";
import { total } from "../helpers";
import { Menu, Button } from "semantic-ui-react";

function ShoppingCart({ cart, onCheckout }) {
  return (
    <Menu>
      <div className="cart">
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
                <tr>
                  <td>{product.title}</td>
                  <td>{product.quantity}</td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                  <td>
                    <Button>+</Button>
                    <Button>-</Button>
                  </td>
                </tr>
              );
            })}

            <tr>
              <td colSpan="3" className="total">
                Total: ${total(cart)}
              </td>
            </tr>
          </tbody>
        </table>
        <Button primary>Checkout</Button>
      </div>
    </Menu>
  );
}

export default ShoppingCart;
