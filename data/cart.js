export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 3
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}];

export function addToCart(productId, quantity, quantitySelectorValue) {
  let matchingCartItem;

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
      });
}

export function updateCartQuantity() {
  let totalCartQuantity = 0;

  cart.forEach((item) => {
    totalCartQuantity += item.quantity;
  });

  document.querySelector(".js-cart-quantity").textContent = totalCartQuantity;
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
