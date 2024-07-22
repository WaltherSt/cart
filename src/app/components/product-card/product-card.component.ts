import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'div[app-product-card]',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product: Product = new Product();
  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();

  addCart(product: Product) {
    this.productEventEmitter.emit(product);
  }
}
