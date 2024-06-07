import renderOrderSummary from "../../scripts/checkout/orderSummary.js";
import {
  cart,
  addToCart,
  loadCartFromStorage,
  updateDeliveryOption,
  deleteCartItem,
} from "../../scripts/data/cart.js";

const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    spyOn(Object.getPrototypeOf(localStorage), "setItem");
  });

  it("should add an existing item to the cart", () => {
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
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it("should add a new item to the cart", () => {
    spyOn(Object.getPrototypeOf(localStorage), "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadCartFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1, 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });
});

describe("test suite: deleteCartItem ", () => {
  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
        <div class="js-checkout-header"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary">
            <div class="js-payment-summary-item-quantity"></div>
        </div>
    `;

    spyOn(Object.getPrototypeOf(localStorage), "setItem");
    spyOn(Object.getPrototypeOf(localStorage), "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 3,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadCartFromStorage();
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = ``;
  });

  it("should remove a productId that is in the cart", () => {
    document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document
        .querySelectorAll(`.js-cart-item-container`)[0]
        .getAttribute("data-product-id")
    ).not.toEqual(productId1);
    expect(document.querySelector(`.js-cart-item-${productId1}`)).toBeNull();
    expect(
      document.querySelector(`.js-cart-item-${productId2}`)
    ).not.toBeNull();
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it("should remove a productId that is not in the cart", () => {
    deleteCartItem("not-a-valid-id");

    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe("test suite: updateDeliveryOption", () => {
  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
        <div class="js-checkout-header"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary">
            <div class="js-payment-summary-item-quantity"></div>
        </div>
    `;

    spyOn(Object.getPrototypeOf(localStorage), "setItem");
    spyOn(Object.getPrototypeOf(localStorage), "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 3,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadCartFromStorage();
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = ``;
  });

  it("should update the delivery option of a product in the cart", () => {
    updateDeliveryOption(productId1, "2");

    expect(cart[0].deliveryOptionId).toEqual("2");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it("should do nothing if product is not in the cart", () => {
    updateDeliveryOption("not-a-valid-id", "3");

    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
