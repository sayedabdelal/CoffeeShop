let navbar = document.querySelector(".navbar");

const menuBtn = document.getElementById("menu-btn");

let cartItem = document.querySelector(".cart-items");
const cartBtn = document.getElementById("cart-btn");

let searchForm = document.querySelector(".search-form");
const searchBtn = document.getElementById("search-btn");
const cartTotal = document.getElementById("total");
menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
});

cartBtn.addEventListener("click", () => {
  cartItem.classList.toggle("active");
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
});

searchBtn.addEventListener("click", () => {
  searchForm.classList.toggle("active");
  navbar.classList.remove("active");
  cartItem.classList.remove("active");
});

window.onscroll = () => {
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

// fetch("https://fake-coffee-api.vercel.app/api")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// fetch("https://api.sampleapis.com/coffee/hot")
//   .then((res) => res.json())
//   .then((data) => console.log(data));
// class ProductCard extends HTMLElement {
//     constructor() {
//       super();
//       this.innerHTML = `
//         <div class="product-card">
//           <h2>Product Name</h2>
//           <p>Description of the product goes here.</p>
//           <button>Add to Cart</button>
//         </div>`;
//     }
//   }
//   customElements.define("product-card", ProductCard);

const getProducts = async () => {
  const res = await fetch("https://fake-coffee-api.vercel.app/api");
  const data = await res.json();
  //   console.log(data.products);
  return data;
};

const displayProduct = (products) => {
  console.log(products);
  const productsHtmlContent = products

    .map(
      (product) =>
        `
        <product-card
        id="${product.id}"
        img="${product.image_url}"
        title="${product.name}"
        description="${product.description}"
        price = "${product.price}"

        ></product-card>
        `
    )
    .join("");
  document.querySelector(".box-container").innerHTML = productsHtmlContent;
  console.log(productsHtmlContent);
};

// get products form api and display it
const initHomePage = async () => {
  const products = await getProducts();
  displayProduct(products);

  document
    .querySelector(".btn-remove-all-from-cart")
    .addEventListener("click", () => {
      const storedProducts = getProductFromLocalStorage();
      storedProducts.forEach((id) => {
        document.querySelector(`.product-card[id="${id}"]`).removeFromCart();
      });
    });

  
};

initHomePage();
