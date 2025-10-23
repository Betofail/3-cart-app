import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartItem } from '../../models/cart-items';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Catalog } from '../catalog/catalog';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'cart-app',
  imports: [RouterOutlet, Catalog, Navbar],
  templateUrl: './cart-app.html',
  standalone: true,
})
export class CartApp implements OnInit {
  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('shopping-cart')!) || [];
    this.calculateTotal();
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
    this.calculateTotal();
    this.saveSession();
  }

  removeItem(item: CartItem): void {
    this.items = this.items.filter((i) => i.product.id !== item.product.id);
    if (this.items.length === 0) {
      sessionStorage.removeItem('shopping-cart');
    }
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (accumulator, item) => accumulator + item.quantity * item.product.price,
      0,
    );
  }

  saveSession(): void {
    sessionStorage.setItem('shopping-cart', JSON.stringify(this.items));
  }
}
