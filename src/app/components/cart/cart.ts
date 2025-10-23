import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cart-items';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
  standalone: true,
})
export class Cart implements OnChanges {
  @Input() items: CartItem[] = [];
  total: number = 0;

  @Output() removeItem: EventEmitter<CartItem> = new EventEmitter();

  ngOnChanges(): void {
    this.calculateTotal();
    this.saveOnSession();
  }

  remove(cartItem: CartItem) {
    this.removeItem.emit(cartItem);
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (accumulator, item) => accumulator + item.product.price * item.quantity,
      0,
    );
  }

  saveOnSession(): void {
    sessionStorage.setItem('shopping-cart', JSON.stringify(this.items));
  }
}
