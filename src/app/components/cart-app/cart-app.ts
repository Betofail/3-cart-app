import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Catalog } from '../catalog/catalog';
import { Cart } from '../cart/cart';
import { CartItem } from '../../models/cart-items';

@Component({
  selector: 'cart-app',
  imports: [Catalog, Cart],
  templateUrl: './cart-app.html',
  standalone: true,
})
export class CartApp implements OnInit {
  products: Product[] = [];
  items: CartItem[] = [];

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
  }
  onAddCart(product: Product): void {
    const hasItem = this.items.find((item) => item.product.id === product.id);
    if (hasItem) {
      this.items = this.items.map((item) => {
        if (item.product.id === product.id) {
          item.quantity += 1;
        }
        return item;
      });
    } else {
      this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }
  }

  removeItem(item: CartItem): void {
    const hasItem = this.items.find((i) => i.product.id === item.product.id);
    if (hasItem) {
      this.items = this.items.filter((i) => i.product.id !== item.product.id);
    }
  }
}
