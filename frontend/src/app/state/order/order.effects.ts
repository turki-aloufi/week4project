import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrderService } from '../../services/order/order.service';
import * as OrderActions from './order.actions';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private orderService: OrderService) {}

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      mergeMap(() =>
        this.orderService.getAllOrders().pipe(
          map((orders) => OrderActions.loadOrdersSuccess({ orders })),
          catchError((error) => of(OrderActions.loadOrdersFailure({ error: error.message })))
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.addOrder),
      mergeMap(({ order }) =>
        this.orderService.createOrder(order).pipe(
          map((createdOrder) => OrderActions.addOrderSuccess({ order: createdOrder })),
          catchError((error) => of(OrderActions.addOrderFailure({ error: error.message })))
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      mergeMap(({ id, order }) =>
        this.orderService.updateOrder(id, order).pipe(
          map(() => OrderActions.updateOrderSuccess({ id })),
          catchError((error) => of(OrderActions.updateOrderFailure({ error: error.message })))
        )
      )
    )
  );

  updateOrderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrderSuccess),
      map(() => OrderActions.loadOrders()) 
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.deleteOrder),
      mergeMap(({ id }) =>
        this.orderService.deleteOrder(id).pipe(
          map(() => OrderActions.deleteOrderSuccess({ id })),
          catchError((error) => of(OrderActions.deleteOrderFailure({ error: error.message })))
        )
      )
    )
  );
}