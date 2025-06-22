import {
  addToCart,
  updateCartQuantity,
  displayAddedMessage,
} from "./data/cart.js";
import { products, loadProducts } from "./data/products.js";

loadProducts(renderProducts);
updateCartQuantity();

function renderProducts() {
  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
         ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="product-quantity js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHtml()}
        
        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id} ">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}"
        data-product-quantity="${0}"
        >
          Add to cart
        </button>
      </div> 
    `;
  });

  document.querySelector(".products-grid").innerHTML = productsHTML;

  // Add to cart
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId, productQuantity } = button.dataset;

      const quantitySelectorValue = Number(
        document.querySelector(`.js-quantity-selector-${productId}`).value
      );

      const quantity = Number(productQuantity) + quantitySelectorValue;

      addToCart(productId, quantity, quantitySelectorValue);

      updateCartQuantity();

      displayAddedMessage(productId);
    });
  });
}

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
