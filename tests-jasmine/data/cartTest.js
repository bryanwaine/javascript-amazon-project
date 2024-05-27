import {
  cart,
  addToCart,
  loadCartFromStorage,
} from "../../scripts/data/cart.js";

describe("test suite: addToCart", () => {
  it("should add an existing item to the cart", () => {
    spyOn(Object.getPrototypeOf(localStorage), "setItem");
    spyOn(Object.getPrototypeOf(localStorage), "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadCartFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1, 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });

  it("should add a new item to the cart", () => {
    spyOn(Object.getPrototypeOf(localStorage), "setItem");
    spyOn(Object.getPrototypeOf(localStorage), "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadCartFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1, 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});
