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

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('slide-up')
      observer.unobserve(entry.target)
    } 
  })
}

const options = {
  threshold: 0.2
}

const observer = new IntersectionObserver(callback, options)

const animatedElements = document.querySelectorAll('.content')
animatedElements.forEach(el => observer.observe(el))

