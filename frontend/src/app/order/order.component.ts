import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../services/order/order.service';
import * as OrderActions from '../state/order/order.actions';
import { selectOrderState, selectAllOrders } from '../state/order/order.selector';
import { AppState } from '../state/order/order.state';
import { CommonModule, AsyncPipe } from '@angular/common';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private store: Store<AppState>) {
    this.orders$ = this.store.select(state => selectAllOrders(state.orders)).pipe(
      tap(orders => console.log('Orders in component:', orders))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(OrderActions.loadOrders());
  }

  deleteOrder(id: number): void {
    this.store.dispatch(OrderActions.deleteOrder({ id }));
  }
}