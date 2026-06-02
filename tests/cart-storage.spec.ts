import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { products } from '../test-data/products';

test('user can add item to cart using storage state', async ({ page }) => {
  await page.goto('/inventory.html');

  const productsPage = new ProductsPage(page);

  await productsPage.addItemToCart(products.backpack);

  await expect(productsPage.getCartBadge()).toHaveText('1');
});
