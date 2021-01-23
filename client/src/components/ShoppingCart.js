import React from "react";
import { total } from "../helpers";
import { Table, Menu, Button } from "semantic-ui-react";

function ShoppingCart({ cart, onCheckout, onAddProduct, onRemoveProduct }) {
  if (cart.length === 0) {
    return (
      <Menu>
        <div className="cart">
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
        <div className="cart">
          <h2>Your Cart</h2>
          <Table columns={5}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Item</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {cart.map((product, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>{product.title}</Table.Cell>
                    <Table.Cell>{product.quantity}</Table.Cell>
                    <Table.Cell>
                      ${(product.price * product.quantity).toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => onRemoveProduct(product._id)}>
                        -
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => onAddProduct(product._id)}>
                        +
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>
                  <strong>Total:</strong>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <strong>${total(cart)}</strong>
                </Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell>
                  <Button primary onClick={onCheckout}>
                    Checkout
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </Menu>
    );
  }
}

export default ShoppingCart;
