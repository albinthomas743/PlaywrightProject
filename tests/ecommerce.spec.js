const { test, expect } = require('@playwright/test');

test.describe('Simple E-commerce tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');  
  });

  test('products are displayed', async ({ page }) => {
    const products = await page.locator('.product');
    await expect(products).toHaveCount(3);
  });

  test('add product to cart and verify cart', async ({ page }) => {
    // Click "Add to Cart" button on first product
    await page.locator('.product button').first().click();

    // Check cart count update
    const cartCount = await page.locator('#cart-count');
    await expect(cartCount).toHaveText('1');

    // Open cart
    await page.locator('#cart-btn').click();

    // Check cart items
    const cartItems = await page.locator('#cart-items li');
    await expect(cartItems).toHaveCount(1);
    await expect(cartItems.first()).toContainText('T-Shirt');

    // Check total price
    const total = await page.locator('#cart-total');
    await expect(total).toHaveText('20.00');
  });
});