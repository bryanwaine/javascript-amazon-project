import renderOrderSummary from "../../scripts/checkout/orderSummary.js";
import renderPaymentSummary from "../../scripts/checkout/paymentSummary.js";
import { loadCartFromStorage, cart } from "../../scripts/data/cart.js";
import { deliveryOptions } from "../../scripts/data/deliveryOptions.js";
import { loadProducts } from "../../scripts/data/products.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });

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
    renderPaymentSummary();
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
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain(`Black and Gray Athletic Cotton Socks - 6 Pairs`);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain(`Intermediate Size Basketball`);
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain(`$`);
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
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain(`Intermediate Size Basketball`);
    expect(document.querySelector(`.js-product-name-${productId1}`)).toBeNull();
  });

  it("should update the delivery option", () => {
    document
      .querySelector(
        `.js-delivery-option-${productId1}-${deliveryOptions[2].id}`
      )
      .click();

    expect(
      document.querySelector(
        `.js-delivery-option-input-${productId1}-${deliveryOptions[2].id}`
      ).checked
    ).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual(deliveryOptions[2].id);
    expect(cart[0].productId).toEqual(productId1);
    expect(
      document.querySelector(`.js-payment-summary-items-total`).innerText
    ).toContain(`$73.75`);
    expect(
      document.querySelector(`.js-payment-summary-shipping`).innerText
    ).toContain(`$14.98`);
  });
});
