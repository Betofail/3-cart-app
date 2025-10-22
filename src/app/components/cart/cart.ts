import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cart-items';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
  standalone: true,
})
export class Cart {
  @Input() items: CartItem[] = [];

  addItem(item: any) {}
}
