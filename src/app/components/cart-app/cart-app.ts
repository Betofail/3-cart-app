import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Catalog } from '../catalog/catalog';
import { Cart } from '../cart/cart';
import { CartItem } from '../../models/cart-items';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'cart-app',
  imports: [Catalog, Cart, Navbar],
  templateUrl: './cart-app.html',
  standalone: true,
})
export class CartApp implements OnInit {
  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

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
    this.saveOnSession();
  }

  removeItem(item: CartItem): void {
    this.items = this.items.filter((i) => i.product.id !== item.product.id);
    this.calculateTotal();
    this.saveOnSession();
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (accumulator, item) => accumulator + item.product.price * item.quantity,
      0,
    );
    this.saveOnSession();
  }

  saveOnSession(): void {
    sessionStorage.setItem('shopping-cart', JSON.stringify(this.items));
  }

  openCart(): void {
    this.showCart = !this.showCart;
  }
}
