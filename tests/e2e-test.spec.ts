import { test, expect } from '@playwright/test';

test('Add to Cart and Checkout', async ({ page }) => {
    // Go to the eCommerce page (adjust URL accordingly)
    await page.goto('http://127.0.0.1:5500/'); // Make sure your local server is running

    // Ensure cart starts with 0 items
    const cart = await page.locator('#cartLink');
    await expect(cart).toHaveText('Cart (0)');

    // Add Product 1 to the cart
    await page.click('button[data-product-id="product1"]');
    await expect(cart).toHaveText('Cart (1)');

    // Add Product 2 to the cart
    await page.click('button[data-product-id="product2"]');
    await expect(cart).toHaveText('Cart (2)');

    // Open cart modal
    await page.click('#cartLink');
    const cartModal = await page.locator('#cartModal');
    await expect(cartModal).toBeVisible();

    // Verify cart contents
    const cartItems = await cartModal.locator('.cart-items');
    await expect(cartItems).toContainText('product1');
    await expect(cartItems).toContainText('product2');

    // Checkout process
    await page.click('#checkoutBtn');
    await page.on('dialog', dialog => {
        expect(dialog.message()).toBe('Proceeding to checkout...');
        dialog.accept();
    });

    // Verify cart is empty after checkout
    await expect(cart).toHaveText('Cart (0)');
});
