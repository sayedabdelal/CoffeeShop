class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.id = this.getAttribute("id");
    this.img = this.getAttribute("img");
    this.title = this.getAttribute("title");
    this.description = this.getAttribute("description");
    this.price = this.getAttribute("price");
    this.classList.add("product-card");
    this.render();
  }

  render() {
    const inCart = getProductFromLocalStorage().includes(this.id);

    this.innerHTML = `
        <div class="box">
            <img src="${this.img}" alt="${this.title}">
            <h3 class="title">${this.title}<h3>
            <p>${this.description}</p>
            <div class="price">${this.price} <span>20.99</span></div>
            ${
              inCart
                ? `<a  class="btn btn-remove-from-cart">remove from cart</a>`
                : `<a  class="btn btn-add-to-cart">add to cart</a>`
            }
        </div>

        `;

    this.querySelector(".btn-add-to-cart")?.addEventListener("click", () =>
      this.addToCart()
    );
    this.querySelector(".btn-remove-from-cart")?.addEventListener("click", () =>
      this.removeFromCart()
    );
    this.renderCart(inCart); // Call renderCart with inCart status
    updateCartTotal();
  }

  renderCart(inCart) {
    const cartItemsContainer = document.querySelector(".cart-items-container");

    const product = {
      id: this.id,
      img: this.img,
      title: this.title,
      price: this.price,
    };
    // price: "$15.99", // Assuming this is static for now
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.id = this.id;
    cartItem.innerHTML = `
      <span class="fas fa-times" id="${product.id}"></span>
      <img src="${product.img}" class="imgCart" alt="">
      <div class="content">
        <h3>${product.title}</h3>
        <div class="price">${product.price}</div>
      </div>`;

      /*
    const deleteIcons = cartItem.querySelectorAll(".fas.fa-times");

    deleteIcons.forEach((deleteIcon) => {
      deleteIcon.addEventListener("click", () => {
        const productId = deleteIcon.getAttribute("id");
        const cartItemToRemove = document.getElementById(productId);
        if (cartItemToRemove) {
          removeFromCart(productId); // Remove the product from the cart
          updateCartTotal(); // Update the cart total
          updateCartItems(); // Update the cart items
        }
      });
    });
    */

    if (inCart) {
      cartItemsContainer.appendChild(cartItem);
    } else {
      // If not in cart, remove the corresponding cart item from the container
      const existingCartItem = cartItemsContainer.querySelector(
        `.cart-item[data-id="${this.id}"]`
      );
      if (existingCartItem) {
        existingCartItem.remove();
      }
    }
  }

  addToCart() {
    const storedProducts = getProductFromLocalStorage();
    storedProducts.push(this.id);
    localStorage.setItem("products", JSON.stringify(storedProducts));
    this.render();
    updateCartTotal();
  }

  removeFromCart() {
    const storedProducts = getProductFromLocalStorage();
    const currentProducts = storedProducts.filter((id) => this.id !== id);
    localStorage.setItem("products", JSON.stringify(currentProducts));
    console.log(this);
    this.render();
    updateCartItems();
    updateCartTotal();
  }

  // removeFromCart(productId) {
  //   const storedProducts = this.getProductFromLocalStorage();
  //   const currentProducts = storedProducts.filter((id) => id !== productId);
  //   localStorage.setItem("products", JSON.stringify(currentProducts));
  //   this.updateCartItems();
  //   this.updateCartTotal();
  // }
}

// function removeFromCart(productId) {
//   const storedProducts = getProductFromLocalStorage();
//   const currentProducts = storedProducts.filter((id) => productId !== id);
//   localStorage.setItem("products", JSON.stringify(currentProducts));

//   updateCartItems();

//   updateCartTotal();
// }

function updateCartTotal() {
  const cartTotal = document.getElementById("total");
  cartTotal.textContent = calculateTotal();
}

function calculateTotal() {
  const storedProducts = getProductFromLocalStorage();
  let total = 0;
  storedProducts.forEach((id) => {
    const product = document.querySelector(`.product-card[id="${id}"]`);
    if (product) {
      const price = product.getAttribute("price");
      total += parseFloat(price); // Parse price to float
    }
  });
  return total.toFixed(2); // Return total with two decimal places
}

// Assuming you have a reference to the cart-items-container element
const cartItemsContainer = document.querySelector(".cart-items-container");

// Listen for custom events dispatched by ProductCard component

// Function to update cart items container
function updateCartItems() {
  // Clear the existing content of the container
  cartItemsContainer.innerHTML = "";

  // Get the products from local storage
  const storedProducts = getProductFromLocalStorage();

  // Loop through stored products and render cart items
  storedProducts.forEach((id) => {
    const product = document.querySelector(`.product-card[id="${id}"]`);
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.id = this.id;
    cartItem.innerHTML = `
      <span class="fas fa-times" id="${product.id}"></span>
      <img src="${product.img}" class="imgCart" alt="">
      <div class="content">
        <h3>${product.title}</h3>
        <div class="price">${product.price}</div>
        
      </div>`;
    cartItemsContainer.appendChild(cartItem);
  });
}

customElements.define("product-card", ProductCard);
