import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  constructor() { }

  addToCart(product: Product) {
    this.cart.push(product);
    this.updateCartBadge(); // Update cart badge after adding product
  }

  getCart(): Product[] {
    return this.cart;
  }

  private updateCartBadge() {
    const cartBadgeElement = document.getElementById('cart-badge');
    if (cartBadgeElement) {
      cartBadgeElement.textContent = String(this.cart.length);
    }
  }

  getQuantity(item: Product): number {
    // Logic to get quantity of a specific item in the cart
    let count = 0;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id === item.id) {
        count++;
      }
    }
    return count;
  }
}
