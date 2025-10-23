import { Component, OnChanges, OnInit } from '@angular/core';
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
  showCart: boolean = false;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('shopping-cart')!) || [];
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
    this.items = this.items.filter((i) => i.product.id !== item.product.id);
    if (this.items.length === 0) {
      sessionStorage.removeItem('shopping-cart');
    }
  }

  // calculateTotal(): void {
  //   this.total = this.items.reduce(
  //     (accumulator, item) => accumulator + item.product.price * item.quantity,
  //     0,
  //   );
  // }

  // saveOnSession(): void {
  //   sessionStorage.setItem('shopping-cart', JSON.stringify(this.items));
  // }

  openCart(): void {
    this.showCart = !this.showCart;
  }
}
