import { validDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadCartFromStorage();

// get cart from local storage
export function loadCartFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

// save to local storage
export function saveToStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// add to cart
export function addToCart(productId, quantity, quantitySelectorValue) {
  let matchingCartItem;

  cart.forEach((item) => {
    if (productId !== item.productId) {
      return;
    }
    matchingCartItem = item;
  });

  matchingCartItem
    ? (matchingCartItem.quantity += quantitySelectorValue)
    : cart.push({
        productId,
        quantity,
        deliveryOptionId: "1",
      });

  saveToStorage(cart);
}

// calculate cart quantity
export function calculateCartQuantity() {
  let totalCartQuantity = 0;

  cart &&
    cart.forEach((item) => {
      totalCartQuantity += item.quantity;
    });

  return totalCartQuantity;
}

// update cart quantity
export function updateCartQuantity() {
  const totalCartQuantity = calculateCartQuantity();

  document.querySelector(".js-cart-quantity").textContent = totalCartQuantity;
}

export function updateCartItemCount() {
  const totalCartQuantity = calculateCartQuantity();

  document.querySelector(
    ".js-payment-summary-item-quantity"
  ).textContent = `Items (${totalCartQuantity}):`;
}

// display added pop up message
export function displayAddedMessage(productId) {
  let timeout;

  if (timeout) {
    clearTimeout(timeout);
  }
  document
    .querySelector(`.js-added-to-cart-${productId}`)
    .classList.add("added-to-cart-visible");

  timeout = setTimeout(() => {
    document
      .querySelector(`.js-added-to-cart-${productId}`)
      .classList.remove("added-to-cart-visible");
  }, 2000);
}

// delete cart item
export function deleteCartItem(productId) {
  cart = cart.filter((item) => item.productId !== productId);

  saveToStorage(cart);
}

// update delivery option
export function updateDeliveryOption(
  productId,
  deliveryOptionId,
) {
  cart.forEach((item) => {
    let matchingCartItem;

    if (item.productId === productId) {
      matchingCartItem = item;
    }
    if (!matchingCartItem) {
      return;
    }
    if (!validDeliveryOption(deliveryOptionId)) {
      return;
    }

    matchingCartItem.deliveryOptionId = deliveryOptionId;
    saveToStorage(cart);
  });
}
