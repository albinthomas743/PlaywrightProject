const products = [
  { id: 1, name: "T-Shirt", price: 20, image: "D://Albin/Playwright/EcomWebsite/150?text=Tshirt1" },
  { id: 2, name: "Jeans", price: 40, image: "https://via.placeholder.com/150?text=Jeans" },
  { id: 3, name: "Sneakers", price: 60, image: "https://via.placeholder.com/150?text=Sneakers" },
];

const productsContainer = document.getElementById("products");
const cartBtn = document.getElementById("cart-btn");
const cartSection = document.getElementById("cart");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let cart = [];

function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const productEl = document.createElement("div");
    productEl.classList.add("product");
    productEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productsContainer.appendChild(productEl);
  });
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartItemsContainer.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
}

productsContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.getAttribute("data-id"));
    const product = products.find(p => p.id === id);
    if (product) {
      cart.push(product);
      updateCart();
    }
  }
});

cartBtn.addEventListener("click", () => {
  cartSection.classList.toggle("hidden");
});

closeCartBtn.addEventListener("click", () => {
  cartSection.classList.add("hidden");
});

renderProducts();
updateCart();