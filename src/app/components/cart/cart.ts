import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-items';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
  standalone: true,
})
export class Cart {
  @Input() items: CartItem[] = [];

  @Output() removeItem: EventEmitter<CartItem> = new EventEmitter();

  remove(cartItem: CartItem) {
    this.removeItem.emit(cartItem);
  }
}
