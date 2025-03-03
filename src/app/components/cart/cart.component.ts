import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  @Input() items: CartItem[] = [];
  @Output() idProductEventEmitter = new EventEmitter();
  @Input() total: number = 0;

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }
}
