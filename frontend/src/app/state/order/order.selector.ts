import { createFeatureSelector } from '@ngrx/store';
import { adapter, OrderState } from './order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('orders');
export const selectAllOrders = (state: OrderState) => adapter.getSelectors().selectAll(state);