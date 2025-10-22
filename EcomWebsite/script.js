document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productsContainer = document.getElementById("productsContainer");
  const productId = document.getElementById("productId");
  const productName = document.getElementById("productName");
  const productPrice = document.getElementById("productPrice");
  const productImage = document.getElementById("productImage");

  // Load products
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const saveToLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const renderProducts = () => {
    productsContainer.innerHTML = "";
    if (products.length === 0) {
      productsContainer.innerHTML = "<p>No products available.</p>";
      return;
    }

    products.forEach((p, index) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
        <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
      `;
      productsContainer.appendChild(card);
    });
  };

  // Add or Update product
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
      id: productId.value ? parseInt(productId.value) : Date.now(),
      name: productName.value,
      price: parseFloat(productPrice.value).toFixed(2),
      image: productImage.value
    };

    if (productId.value) {
      // Update
      const index = products.findIndex(p => p.id == newProduct.id);
      products[index] = newProduct;
    } else {
      // Insert
      products.push(newProduct);
    }

    saveToLocalStorage();
    renderProducts();
    productForm.reset();
    productId.value = "";
  });

  // Expose edit and delete functions globally
  window.editProduct = (index) => {
    const p = products[index];
    productId.value = p.id;
    productName.value = p.name;
    productPrice.value = p.price;
    productImage.value = p.image;
  };

  window.deleteProduct = (index) => {
    if (confirm("Delete this product?")) {
      products.splice(index, 1);
      saveToLocalStorage();
      renderProducts();
    }
  };

  // Initial render
  renderProducts();
});
