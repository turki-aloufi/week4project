import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { OrderService } from '../../services/order/order.service';
import * as OrderActions from './order.actions';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private orderService: OrderService) {}

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      tap(() => console.log('Load Orders action dispatched')),
      mergeMap(() =>
        this.orderService.getAllOrders().pipe(
          tap(orders => console.log('Orders fetched:', orders)),
          map((orders) => OrderActions.loadOrdersSuccess({ orders })),
          catchError((error) => {
            console.error('Error fetching orders:', error);
            return of(OrderActions.loadOrdersFailure({ error: error.message }));
          })
        )
      )
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.deleteOrder),
      mergeMap(({ id }) =>
        this.orderService.deleteOrder(id).pipe(
          map(() => OrderActions.deleteOrderSuccess({ id })),
          catchError((error) =>
            of(OrderActions.deleteOrderFailure({ error: error.message }))
          )
        )
      )
    )
  );
}