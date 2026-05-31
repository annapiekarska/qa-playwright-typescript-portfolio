import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async addItemToCart(itemName: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
  }
  getCartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
