import { test, expect } from '../fixtures/authFixtures';
import { ProductsPage } from '../pages/ProductsPage';
import { products } from '../test-data/products';

test('user can add item to cart using logged in fixture', async ({ loggedInPage }) => {
  const productsPage = new ProductsPage(loggedInPage);

  await productsPage.addItemToCart(products.backpack);

  await expect(productsPage.getCartBadge()).toHaveText('1');
});