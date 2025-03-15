import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products || []
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading || false
);

export const selectProductsError = createSelector(
  selectProductState,
  (state: ProductState) => state.error || null
);