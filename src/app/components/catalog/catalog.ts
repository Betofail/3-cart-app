import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCart } from '../product-cart/product-cart';

@Component({
  selector: 'catalog',
  imports: [ProductCart],
  templateUrl: './catalog.html',
  standalone: true,
})
export class Catalog {
  @Input() products!: Product[];
}
