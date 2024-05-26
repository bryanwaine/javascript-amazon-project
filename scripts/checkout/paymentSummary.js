import { getCart, updateCartItemCount } from "../../data/cart.js";
import { getDeliveryOptionById } from "../../data/deliveryOptions.js";
import { getProductById } from "../../data/products.js";
import { formatCurrency } from "../utils/currencyFormat.js";

function renderPaymentSummary() {
  let paymentSummaryHTML = "";

  let cartArr =  getCart();

  let totalPrice = 0;
  let totalShipping = 0;
  cartArr.forEach((item) => {
    const product = getProductById(item.productId);
    totalPrice += item.quantity * product.priceCents;

    const deliveryOption = getDeliveryOptionById(item.deliveryOptionId);
    const shipping = deliveryOption.priceCents;
    totalShipping += shipping;
  });

  const totalBeforeTax = totalPrice + totalShipping;

  const formattedTotal = `$${formatCurrency(totalPrice)}`;
  const formattedShipping = `$${formatCurrency(totalShipping)}`;

  const formattedTotalBeforeTax = `$${formatCurrency(totalBeforeTax)}`;

  const formattedTax = `$${formatCurrency(totalBeforeTax / 10)}`;

  const formattedOrderTotal = `$${formatCurrency(
    totalBeforeTax + totalBeforeTax / 10
  )}`;

  paymentSummaryHTML += `
    <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div class="js-payment-summary-item-quantity"></div>
            <div class="payment-summary-money">${formattedTotal}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formattedShipping}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formattedTotalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formattedTax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formattedOrderTotal}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

  const paymentSummaryElement = document.querySelector(".js-payment-summary");
  paymentSummaryElement.innerHTML = paymentSummaryHTML;

  updateCartItemCount();
}

export default renderPaymentSummary;
