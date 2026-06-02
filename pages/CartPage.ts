import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  getCartItem(itemName: string) {
    return this.page.getByText(itemName);
  }
}
