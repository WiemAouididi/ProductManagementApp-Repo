import { Component } from '@angular/core';
import {Product} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCart();
  }

  getQuantity(item: Product): number {
    return this.cartService.getQuantity(item);
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * this.getQuantity(item);
    }
    return totalPrice;
  }

}
