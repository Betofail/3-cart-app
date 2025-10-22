import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-cart',
  imports: [],
  templateUrl: './product-cart.html',
  standalone: true,
})
export class ProductCart {
  @Input() product!: Product;

  @Output() addCart: EventEmitter<Product> = new EventEmitter<Product>();

  onAddCart(product: Product): void {
    this.addCart.emit(product);
  }
}
