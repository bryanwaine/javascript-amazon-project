import renderOrderSummary from "../../scripts/checkout/orderSummary.js";
import { loadCartFromStorage, cart } from "../../scripts/data/cart.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

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

  it("should render the order summary", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain(`Quantity: 1`);
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain(`Quantity: 3`);
  });

  it("should remove a product", () => {
    document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document
        .querySelectorAll(`.js-cart-item-container`)[0]
        .getAttribute("data-product-id")
    ).not.toEqual(productId1);
    expect(document.querySelector(`.js-cart-item-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-${productId2}`)).not.toEqual(
      null
    );
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});
