import { validDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadCartFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

    saveToStorage(cartItems) {
      localStorage.setItem(localStorageKey, JSON.stringify(cartItems));
    },

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
    },

    calculateCartQuantity() {
      let totalCartQuantity = 0;

      this.cartItems &&
        this.cartItems.forEach((item) => {
          totalCartQuantity += item.quantity;
        });

      return totalCartQuantity;
    },

    updateCartQuantity() {
      const totalCartQuantity = this.calculateCartQuantity();

      document.querySelector(".js-cart-quantity").textContent =
        totalCartQuantity;
    },

    updateCartItemCount() {
      const totalCartQuantity = this.calculateCartQuantity();

      document.querySelector(
        ".js-payment-summary-item-quantity"
      ).textContent = `Items (${totalCartQuantity}):`;
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(
        (item) => item.productId !== productId
      );

      this.saveToStorage(this.cartItems);
    },

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
    },
  };

  return cart;
}

const cart = Cart("cart-oop")
const businessCart = Cart("cart-business")

cart.loadCartFromStorage();
businessCart.loadCartFromStorage();

console.log(cart)
console.log(businessCart)
