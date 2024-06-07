import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadCartFromStorage();
   
  }

  loadCartFromStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  saveToStorage(cartItems) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cartItems));
  }

  addToCart(productId, quantity, quantitySelectorValue) {
    let matchingCartItem;

    this.cartItems.forEach((item) => {
      if (productId !== item.productId) {
        return;
      }
      matchingCartItem = item;
    });

    matchingCartItem
      ? (matchingCartItem.quantity += quantitySelectorValue)
      : this.cartItems.push({
          productId,
          quantity,
          deliveryOptionId: "1",
        });

    this.saveToStorage(this.cartItems);
  }

  calculateCartQuantity() {
    let totalCartQuantity = 0;

    this.cartItems &&
      this.cartItems.forEach((item) => {
        totalCartQuantity += item.quantity;
      });

    return totalCartQuantity;
  }

  updateCartQuantity() {
    const totalCartQuantity = this.calculateCartQuantity();

    document.querySelector(".js-cart-quantity").textContent = totalCartQuantity;
  }

  updateCartItemCount() {
    const totalCartQuantity = this.calculateCartQuantity();

    document.querySelector(
      ".js-payment-summary-item-quantity"
    ).textContent = `Items (${totalCartQuantity}):`;
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId
    );

    this.saveToStorage(this.cartItems);
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    this.cartItems.forEach((item) => {
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
      this.saveToStorage(this.cartItems);
    });
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);
