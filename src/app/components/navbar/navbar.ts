import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-items';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  standalone: true,
})
export class Navbar {
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
}
