import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnChanges {
  @Input() items: CartItem[] = [];
  total: number = 0;
  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    let itemsChanges = changes['items'];
    this.calculateTotal();

    this.saveSession();
  }
  onDeleteCart(id: number): void {
    this.idProductEventEmitter.emit(id);
  }
  calculateTotal(): void {
    this.total = this.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
    console.log('TOTAL: ' + this.total);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
