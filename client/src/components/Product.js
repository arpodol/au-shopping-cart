import React from "react";
import { Item, Button } from "semantic-ui-react";

class Product extends React.Component {
  handleCartClick = (e) => {
    e.preventDefault();
    this.props.onCartClick(this.props.product._id);
  };

  render() {
    return (
      <Item>
        <Item.Content>
          <Item.Header as="a">{this.props.product.title}</Item.Header>
          <Item.Description>
            ${this.props.product.price.toFixed(2)}
          </Item.Description>
          {this.props.product.quantity > 0 ? (
            <Button primary onClick={this.handleCartClick}>
              Add to Cart
            </Button>
          ) : (
            <Button disabled>Out of Stock</Button>
          )}

          <p className="quantity">
            {this.props.product.quantity} left in stock
          </p>
        </Item.Content>
      </Item>
    );
  }
}

export default Product;
