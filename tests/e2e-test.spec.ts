import { test, expect } from '@playwright/test';

test('Add to Cart and Checkout', async ({ page }) => {
    // Go to the eCommerce website
    await page.goto('http://localhost:3000'); // Adjust the URL accordingly

    // Ensure the cart starts at 0
    const cart = await page.locator('.cart a');
    await expect(cart).toHaveText('Cart (0)');

    // Add product 1 to the cart
    await page.click('button[data-product-id="product1"]');
    await expect(cart).toHaveText('Cart (1)');

    // Add product 2 to the cart
    await page.click('button[data-product-id="product2"]');
    await expect(cart).toHaveText('Cart (2)');

    // Open the cart modal
    await page.click('.cart a');
    const cartModal = await page.locator('#cart-modal');
    await expect(cartModal).toBeVisible();

    // Checkout
    await page.click('.checkout');
    await expect(page).toHaveAlert('Proceeding to checkout!');
    
    // Ensure the cart is emptied after checkout
    await expect(cart).toHaveText('Cart (0)');
});
