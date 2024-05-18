import { cart, deleteCartItem } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";



function updateCartSummary() {
    let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  const quantity = cartItem.quantity;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const { id, image, name, priceCents } = matchingProduct;

  cartSummaryHTML += `
    <div class="cart-item-container">
    <div class="delivery-date">
      Delivery date: Wednesday, June 15
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${name}
        </div>
        <div class="product-price">
          ${formatMoney(priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-cart-item" data-product-id="${id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="${id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input"
            name="${id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="${id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
});

const cartSummary = document.querySelector(".js-order-summary");
cartSummary.innerHTML = cartSummaryHTML;
}

updateCartSummary();

document.querySelectorAll(".js-delete-cart-item").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    deleteCartItem(productId);
    updateCartSummary();
  });
});
