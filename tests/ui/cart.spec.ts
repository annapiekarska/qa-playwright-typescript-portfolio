import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { loginAsStandardUser } from '../../helpers/auth';
import { products } from '../../test-data/products';

test('user can add item to cart', async ({ page }) => {
  await loginAsStandardUser(page);

  const productsPage = new ProductsPage(page);
  await productsPage.addItemToCart(products.backpack);

  await expect(productsPage.getCartBadge()).toHaveText('1');
});

test('user can see added item in cart', async ({ page }) => {
  await loginAsStandardUser(page);

  const productsPage = new ProductsPage(page);
  await productsPage.addItemToCart(products.backpack);

  await productsPage.openCart();

  const cartPage = new CartPage(page);
  await expect(cartPage.getCartItem('Sauce Labs Backpack')).toBeVisible();
});
