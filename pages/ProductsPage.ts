import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async addItemToCart(productId: string) {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }
  getCartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
