import renderPaymentSummary from "./checkout/paymentSummary.js";
import renderOrderSummary from "./checkout/orderSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { loadProducts } from "./data/products.js";
import { loadCart } from "./data/cart.js";

// import './data/backend-practice.js'

/*
new Promise((resolve) => {
    loadProducts(() => {
     
    resolve();
  });
}).then(() => {
  loadCart();
  renderPaymentSummary();
  renderOrderSummary();
  renderCheckoutHeader();
}); 
*/

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderCheckoutHeader();
    renderPaymentSummary();
    renderOrderSummary();
  });

/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderPaymentSummary();
    renderOrderSummary();
  });
});
*/
