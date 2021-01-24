import React from "react";
import { shallow } from "enzyme";
import ShoppingCart from "../components/ShoppingCart";

describe("ShoppingCart", () => {
  let wrapper;
  const props = {
    cart: [
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
    wrapper = shallow(<ShoppingCart {...props} />);
  });

  it("should calculate total", () => {
    expect(wrapper.containsMatchingElement(<strong>$55.55</strong>)).toBe(true);
  });

  describe("Remove grapes from cart", () => {
    beforeEach(() => {
      const updatedProps = {
        cart: [
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

    it("should calculate new total", () => {
      expect(wrapper.containsMatchingElement(<strong>$33.33</strong>)).toBe(
        true
      );
    });
  });
});
