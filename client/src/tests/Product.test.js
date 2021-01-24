import React from "react";
import { shallow } from "enzyme";
import Product from "../components/Product";
import { Button } from "semantic-ui-react";

describe("Product", () => {
  let wrapper;
  const props = {
    product: {
      title: "testProd",
      quantity: 0,
      price: 22.22,
      _id: 1,
    },
  };

  beforeEach(() => {
    wrapper = shallow(<Product {...props} />);
  });

  it("should have an out of stock button", () => {
    expect(wrapper.contains(<Button disabled>Out of Stock</Button>)).toBe(true);
  });

  describe("Product has quantity greater than 0", () => {
    beforeEach(() => {
      const inStockProps = {
        product: {
          title: "testProd",
          quantity: 2,
          price: 22.22,
          _id: 1,
        },
      };
      wrapper.setProps(inStockProps);
    });

    it("should enable button", () => {
      expect(
        wrapper.containsMatchingElement(<Button>Add to Cart</Button>)
      ).toBe(true);
    });
  });
});
