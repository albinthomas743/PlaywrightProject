// Initialize an empty cart
let carts: string[] = [];

// Function to update the cart display
function updateCartDisplay() {
    const cartLink = document.getElementById('cartLink');
    const cartModal = document.getElementById('cartModal');
    const cartItemsDiv = document.querySelector('.cart-items')!;
    cartLink!.textContent = `Cart (${carts.length})`;

    // Show cart modal if there are items in the cart
    if (carts.length > 0) {
        cartModal!.style.display = 'block';
        cartItemsDiv.innerHTML = carts.map(item => `<p>${item}</p>`).join('');
    } else {
        cartModal!.style.display = 'none';
    }
}

// Function to add an item to the cart
function addToCart(productId: string) {
    cart.push(productId);
    updateCartDisplay();
}

// Function to handle checkout
function checkout() {
    alert('Proceeding to checkout...');
    cart = [];
    updateCartDisplay();
}

// Attach event listeners to the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = (event.target as HTMLButtonElement).getAttribute('data-product-id')!;
        addToCart(productId);
    });
});

// Attach event listener to checkout button
document.getElementById('checkoutBtn')?.addEventListener('click', checkout);

// Initialize cart on page load
updateCartDisplay();
