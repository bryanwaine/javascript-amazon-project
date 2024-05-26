export function getCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
}

export function saveToStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, quantity, quantitySelectorValue) {
  let matchingCartItem;

  let cart = getCart();

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingCartItem = item;
    }
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

  let cart = getCart();

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

  document.querySelector(".js-return-to-home-link").textContent =
    totalCartQuantity === 1
      ? `${totalCartQuantity} item`
      : `${totalCartQuantity} items`;

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

export function deleteCartItem(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.productId !== productId);

  saveToStorage(cart);
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let cart = getCart();

  cart.forEach((item) => {
    if (item.productId === productId) {
      item.deliveryOptionId = deliveryOptionId;
    }
  });
  saveToStorage(cart);
}
