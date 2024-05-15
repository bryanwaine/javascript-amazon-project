export const cart = [];

export function addToCart(id, name, priceCents, image, quantity, quantitySelectorValue) {
    let matchingCartItem;
  
    cart.forEach((item) => {
      if (id === item.id) {
        matchingCartItem = item;
      }
    });
  
    matchingCartItem
      ? (matchingCartItem.quantity += quantitySelectorValue)
      : cart.push({
          id,
          name,
          priceCents,
          image,
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
  
  export function displayAddedMessage(id) {
    let timeout;
  
    if (timeout) {
      clearTimeout(timeout);
    }
    document
      .querySelector(`.js-added-to-cart-${id}`)
      .classList.add("added-to-cart-visible");
  
    timeout = setTimeout(() => {
      document
        .querySelector(`.js-added-to-cart-${id}`)
        .classList.remove("added-to-cart-visible");
    }, 2000);
  }
