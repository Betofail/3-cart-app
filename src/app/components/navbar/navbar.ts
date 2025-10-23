import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-items';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.html',
  standalone: true,
})
export class Navbar {
  @Input() items: CartItem[] = [];

  @Output() toggleCart = new EventEmitter<void>();

  toggleEvent(): void {
    this.toggleCart.emit();
  }
}
