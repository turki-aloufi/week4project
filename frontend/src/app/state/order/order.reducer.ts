import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Order } from '../../services/order/order.service';
import * as OrderActions from './order.actions';

export interface OrderState extends EntityState<Order> {
  loading: boolean;
  error: string | null;
}

export const adapter = createEntityAdapter<Order>();

export const initialState: OrderState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, (state) => ({ ...state, loading: true, error: null })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) =>
    adapter.setAll(orders, { ...state, loading: false })
  ),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrderActions.addOrder, (state) => ({ ...state, loading: true, error: null })),
  on(OrderActions.addOrderSuccess, (state, { order }) =>
    adapter.addOne(order, { ...state, loading: false })
  ),
  on(OrderActions.addOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrderActions.updateOrder, (state) => ({ ...state, loading: true, error: null })),
  on(OrderActions.updateOrderSuccess, (state, { id }) => ({
    ...state,
    loading: false,
  })),
  on(OrderActions.updateOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrderActions.deleteOrder, (state) => ({ ...state, loading: true, error: null })),
  on(OrderActions.deleteOrderSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(OrderActions.deleteOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const { selectAll } = adapter.getSelectors();