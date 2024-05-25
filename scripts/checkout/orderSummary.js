import {
  cart,
  deleteCartItem,
  updateCartItemCount,
  saveToStorage,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProductById } from "../../data/products.js";
import { formatCurrency } from "../utils/currency.js";
import { formatDate } from "../utils/date.js";
import {deliveryOptions, getDeliveryOptionById} from "../../data/deliveryOptions.js";

function renderOrderSummary() {
  let orderSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const quantity = cartItem.quantity;
    const deliveryOptionId = cartItem.deliveryOptionId;

    const matchingProduct = getProductById(productId);

    const { id, image, name, priceCents } = matchingProduct;

    let deliveryOption = getDeliveryOptionById(deliveryOptionId)

    orderSummaryHTML += `
      <div class="cart-item-container js-cart-item-${id}">
      <div class="delivery-date">
        Delivery date: ${formatDate(deliveryOption)}
      </div>
  
      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${image}">
  
        <div class="cart-item-details">
          <div class="product-name">
            ${name}
          </div>
          <div class="product-price">
            $${formatCurrency(priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${id}">${quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${id}" type="number" value="${quantity}">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-cart-item" data-product-id="${id}">
              Delete
            </span>
          </div>
        </div>
  
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHtml(id, deliveryOptionId)}
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

      deliveryOptionsHTML += `<div class="delivery-option js-delivery-option" data-delivery-option-id="${
        deliveryOption.id
      }" data-product-id="${id}">
              <input type="radio" ${isChecked} class="delivery-option-input"
                name="${id}">
              <div>
                <div class="delivery-option-date">
                ${formatDate(deliveryOption)}
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

  updateCartItemCount();

  document.querySelectorAll(".js-delete-cart-item").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      deleteCartItem(productId);
      updateCartItemCount();

      document.querySelector(`.js-cart-item-${productId}`).remove();
    });
  });

  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      document
        .querySelector(`.js-cart-item-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });

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
          updateCartItemCount();
        }
      });

      document
        .querySelector(`.js-cart-item-${productId}`)
        .classList.remove("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}

export default renderOrderSummary;
