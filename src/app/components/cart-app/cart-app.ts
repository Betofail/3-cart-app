import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Catalog } from '../catalog/catalog';
import { Cart } from '../cart/cart';

@Component({
  selector: 'cart-app',
  imports: [Catalog, Cart],
  templateUrl: './cart-app.html',
  standalone: true,
})
export class CartApp implements OnInit {
  products: Product[] = [];
  items: any[] = [];

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
  }
}
