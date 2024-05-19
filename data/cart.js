export const cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(productId, quantity, quantitySelectorValue) {
  let matchingCartItem;

  let cartArr = JSON.parse(localStorage.getItem("cart")) || [];

  cartArr.forEach((item) => {
    if (productId === item.productId) {
      matchingCartItem = item;
    }
  });

  matchingCartItem
    ? (matchingCartItem.quantity += quantitySelectorValue)
    : cartArr.push({
        productId,
        quantity,
      });

  localStorage.setItem("cart", JSON.stringify(cartArr));
}

export function updateCartQuantity() {
  let totalCartQuantity = 0;

  let cartArr = JSON.parse(localStorage.getItem("cart"));

  cartArr &&
    cartArr.forEach((item) => {
      totalCartQuantity += item.quantity;
    });

  document.querySelector(".js-cart-quantity").textContent = totalCartQuantity;

  localStorage.setItem("cart", JSON.stringify(cartArr));
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
  let cartArr = JSON.parse(localStorage.getItem("cart"));
  cartArr = cartArr.filter((item) => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(cartArr));
    
}

export function updateCartHeaderCount() {
    document.querySelector(".js-return-to-home-link").textContent =
      cart.length === 1 ? `${cart.length} item` : `${cart.length} items`;
  }