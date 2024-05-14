
let productsHTML = "";

products.forEach(({ image, name, rating, priceCents }) => {
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
          <select>
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

        <button class="add-to-cart-button button-primary">
          Add to cart
        </button>
      </div> 
    `;
});

document.querySelector(".products-grid").innerHTML = productsHTML;
