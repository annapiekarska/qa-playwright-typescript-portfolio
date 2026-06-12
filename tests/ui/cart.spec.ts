import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { loginAsStandardUser } from '../../helpers/auth';
import { products } from '../../test-data/products';

test('user can add item to cart @ui @smoke @cart', async ({ page }) => {
  await loginAsStandardUser(page);

  const productsPage = new ProductsPage(page);
  await productsPage.addItemToCart(products.backpack.id);

  await expect(productsPage.getCartBadge()).toHaveText('1');
});

test('user can see added item in cart @ui @regression @cart', async ({ page }) => {
  await loginAsStandardUser(page);

  const productsPage = new ProductsPage(page);
  await productsPage.addItemToCart(products.backpack.id);

  await productsPage.openCart();

  const cartPage = new CartPage(page);
  await expect(cartPage.getCartItem(products.backpack.displayName)).toBeVisible();
});
