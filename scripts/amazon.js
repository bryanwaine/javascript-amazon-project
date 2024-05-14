let productsHTML = "";

products.forEach(({ id, image, name, rating, priceCents, quantity }) => {
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
        
        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${id}"
        data-product-name="${name}" data-product-price="${priceCents}"
        data-product-image="${image}"
        data-product-quantity="1"
        >
          Add to cart
        </button>
      </div> 
    `;
});

document.querySelector(".products-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
      const {
      productId: id,
      productName: name,
      productPrice: priceCents,
      productImage: image,
      productQuantity: quantity,
      } = button.dataset;
      
      console.log(button.dataset)

    let matchingCartItem;

    cart.forEach((item) => {
      if (id === item.id) {
        matchingCartItem = item;
      }
    });

    matchingCartItem
      ? matchingCartItem.quantity++
      : cart.push({
          id,
          name,
          priceCents,
          image,
          quantity,
        });

    console.log(cart);
  });
});
