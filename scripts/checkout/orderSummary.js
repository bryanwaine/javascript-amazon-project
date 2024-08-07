import renderPaymentSummary from "./paymentSummary.js";
import renderCheckoutHeader from "./checkoutHeader.js";
import {
  cart,
  removeFromCart,
  updateCartItemCount,
  saveToStorage,
  updateDeliveryOption,
} from "../data/cart.js";
import { getProductById } from "../data/products.js";
import { formatCurrency } from "../utils/currencyFormat.js";
import { calculateDeliveryDate } from "../utils/dateFormat.js";
import {
  deliveryOptions,
  getDeliveryOptionById,
} from "../data/deliveryOptions.js";

function renderOrderSummary() {
  let orderSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const quantity = cartItem.quantity;
    const deliveryOptionId = cartItem.deliveryOptionId;

    const matchingProduct = getProductById(productId);

    let deliveryOption = getDeliveryOptionById(deliveryOptionId);

    orderSummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${calculateDeliveryDate(deliveryOption)}
      </div>
  
      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">
  
        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-${matchingProduct.id}">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" value="${matchingProduct.quantity}">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link js-delete-quantity-link-${matchingProduct.id} link-primary js-delete-cart-item" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
  
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHtml(matchingProduct.id, deliveryOptionId)}
        </div>
      </div>
    </div>
      `;
  });

  function deliveryOptionsHtml(id, deliveryOptionId) {
    let deliveryOptionsHTML = "";
    deliveryOptions.forEach((deliveryOption) => {
      const formattedPrice =
        deliveryOption.priceCents === 0
          ? `FREE`
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOptionId === deliveryOption.id ? "checked" : "";

      deliveryOptionsHTML += `<div class="delivery-option js-delivery-option js-delivery-option-${id}-${deliveryOption.id}" data-delivery-option-id="${
        deliveryOption.id
      }" data-product-id="${id}">
              <input type="radio" ${isChecked} class="delivery-option-input js-delivery-option-input-${id}-${deliveryOption.id}"
                name="${id}">
              <div>
                <div class="delivery-option-date">
                ${calculateDeliveryDate(deliveryOption)}
                </div>
                <div class="delivery-option-price">
                  ${formattedPrice} Shipping
                </div>
              </div>
            </div>`;
    });

    return deliveryOptionsHTML;
  }

  const orderSummaryElement = document.querySelector(".js-order-summary");
  orderSummaryElement.innerHTML = orderSummaryHTML;

  // Delete cart item
  document.querySelectorAll(".js-delete-cart-item").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
      updateCartItemCount();

      // document.querySelector(`.js-cart-item-${productId}`).remove();
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // Update cart quantity in checkout page
  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      document
        .querySelector(`.js-cart-item-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });

  // Save updated cart quantity in checkout page
  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      let cartArr = cart;
      cartArr.forEach((item) => {
        if (item.productId === productId) {
          const newQuantity = Number(
            document.querySelector(`.js-quantity-input-${productId}`).value
          );

          if (newQuantity < 1) {
            alert("Quantity must be greater than 0");
            return;
          } else {
            item.quantity = newQuantity;
          }
          document.querySelector(
            `.js-quantity-label-${productId}`
          ).textContent = newQuantity;

          saveToStorage(cartArr);
          renderCheckoutHeader();
          updateCartItemCount();
          renderPaymentSummary();
        }
      });

      document
        .querySelector(`.js-cart-item-${productId}`)
        .classList.remove("is-editing-quantity");
    });
  });

  // Update delivery option
  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

export default renderOrderSummary;
