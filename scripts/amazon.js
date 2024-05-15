import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

products.forEach(({ id, image, name, rating, priceCents }) => {
  productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="product-quantity js-quantity-selector-${id}">
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
        
        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${id} ">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${id}"
        data-product-name="${name}" data-product-price="${priceCents}"
        data-product-image="${image}"
        data-product-quantity="${0}"
        >
          Add to cart
        </button>
      </div> 
    `;
});

document.querySelector(".products-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const {
      productId: id,
      productName: name,
      productPrice: priceCents,
      productImage: image,
      productQuantity,
    } = button.dataset;

    const quantitySelectorValue = Number(
      document.querySelector(`.js-quantity-selector-${id}`).value
    );

    const quantity = Number(productQuantity) + quantitySelectorValue;

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

    let totalCartQuantity = 0;

    cart.forEach((item) => {
      totalCartQuantity += item.quantity;
    });

    document.querySelector(".js-cart-quantity").textContent = totalCartQuantity;

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
  });
});
