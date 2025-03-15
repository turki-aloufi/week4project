import { createReducer, on } from '@ngrx/store';
import { Product } from '../../services/product/product.service';
import {
  loadProductsSuccess,
  deleteProductSuccess,
} from './product.actions';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter(p => p.id !== id),
    loading: false,
  }))
);