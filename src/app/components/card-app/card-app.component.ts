import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartComponent } from '../cart/cart.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-card-app',
  standalone: true,
  imports: [
    CatalogComponent,
    ProductCardComponent,
    CartComponent,
    NavbarComponent,
  ],
  templateUrl: './card-app.component.html',
  styleUrl: './card-app.component.css',
})
export class CardAppComponent implements OnInit {
  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
    const cart = sessionStorage.getItem('cart');
    this.items = cart ? JSON.parse(cart) : [];
    this.calculateTotal();
  }

  addItemCart(product: Product) {
    const hasItem = this.items.find((item) => item.product.id === product.id);
    if (hasItem) {
      this.items = this.items.map((item) => {
        if (item.product.id == hasItem.product.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    } else {
      this.items.push({ quantity: 1, product });
    }
    this.calculateTotal();
    this.saveSession();
  }

  deleteItemCart(id: number) {
    this.items = this.items.filter((item) => item.product.id != id);
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (accumulator, item) => accumulator + item.quantity * item.product.price,
      0
    );
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
  setShowCart(): void {
    this.showCart = !this.showCart;
  }
}
