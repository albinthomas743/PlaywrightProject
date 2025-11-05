let cart = [];

function updateCart() {
    const cartCount = document.querySelector('.cart a');
    cartCount.textContent = `Cart (${cart.length})`;

    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.querySelector('.cart-items');

    // Clear current cart items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.textContent = item;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartModal.style.display = cart.length > 0 ? 'block' : 'none';
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        cart.push(productId);
        updateCart();
    });
});

document.querySelector('.checkout')?.addEventListener('click', () => {
    alert('Proceeding to checkout!');
    cart = [];
    updateCart();
});
