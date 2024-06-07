import { validDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadCartFromStorage();

export function loadCartFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart)
}

export function saveToStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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

export function calculateCartQuantity() {
  let totalCartQuantity = 0;

  cart &&
    cart.forEach((item) => {
      totalCartQuantity += item.quantity;
    });

  return totalCartQuantity;
}

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

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);

  saveToStorage(cart);
}

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

