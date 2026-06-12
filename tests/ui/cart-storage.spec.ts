import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { products } from '../../test-data/products';

test('user can add item to cart using storage state @ui @regression @cart @storage', async ({
  page,
}) => {
  await page.goto('/inventory.html');

  const productsPage = new ProductsPage(page);

  await productsPage.addItemToCart(products.backpack.id);

  await expect(productsPage.getCartBadge()).toHaveText('1');
});
