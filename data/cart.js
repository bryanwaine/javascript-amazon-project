export const cart = JSON.parse(localStorage.getItem("cart")) || [];

export function saveToStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

export function addToCart(productId, quantity, quantitySelectorValue) {
  let matchingCartItem;

  let cartArr = cart

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
        deliveryOptionId: '1'
      });

  saveToStorage(cartArr);
}

export function calculateCartQuantity() {
    let totalCartQuantity = 0;
  
    let cartArr = JSON.parse(localStorage.getItem("cart"));
  
    cartArr &&
      cartArr.forEach((item) => {
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
    
    document.querySelector(".js-payment-summary-item-quamtity").textContent = `Items (${totalCartQuantity}):`
       
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

  saveToStorage(cartArr);
}





