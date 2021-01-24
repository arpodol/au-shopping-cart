import React from "react";
import { shallow } from "enzyme";
import ProductList from "../components/ProductList";
import Product from "../components/Product";

describe("ProductList", () => {
  let wrapper;
  const props = {
    products: [
      {
        title: "apples",
        quantity: 1,
        price: 33.33,
        _id: 1,
      },
      {
        title: "grapes",
        quantity: 1,
        price: 22.22,
        _id: 2,
      },
    ],
  };

  beforeEach(() => {
    wrapper = shallow(<ProductList {...props} />);
  });

  it("should render two children", () => {
    expect(wrapper.find(Product)).toHaveLength(2);
  });

  describe("Remove grapes from products", () => {
    beforeEach(() => {
      const updatedProps = {
        products: [
          {
            title: "apples",
            quantity: 1,
            price: 33.33,
            _id: 1,
          },
        ],
      };
      wrapper.setProps(updatedProps);
    });

    it("should render one child", () => {
      expect(wrapper.find(Product)).toHaveLength(1);
    });
  });
});
