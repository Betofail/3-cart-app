import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() addCart: EventEmitter<Product> = new EventEmitter<Product>();

  onAddCart(product: Product): void {
    this.addCart.emit(product);
  }
}
