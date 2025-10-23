import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-items';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
  standalone: true,
})
export class Cart {
  items: CartItem[] = [];
  total: number = 0;

  removeItem: EventEmitter<CartItem> = new EventEmitter();

  constructor(private router: Router) {
    this.items = this.router.currentNavigation()?.extras.state!['items'];
    this.total = this.router.currentNavigation()?.extras.state!['total'];
  }
  remove(cartItem: CartItem) {
    this.removeItem.emit(cartItem);
  }
}
