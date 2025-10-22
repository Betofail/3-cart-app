import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-cart',
  imports: [],
  templateUrl: './product-cart.html',
  standalone: true,
})
export class ProductCart {
  @Input() product!: Product;
}
