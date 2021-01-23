import React from "react";
import Product from "./Product";
import { Item } from "semantic-ui-react";

function ProductList({ products, onCartClick }) {
  return (
    <div className="productList">
      <h2>Products</h2>
      <Item.Group divided>
        {products.map((product, i) => {
          return (
            <Product key={i} product={product} onCartClick={onCartClick} />
          );
        })}
      </Item.Group>
    </div>
  );
}

export default ProductList;
