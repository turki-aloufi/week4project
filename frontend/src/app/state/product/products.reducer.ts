// src/app/state/product/product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { ProductState, initialState } from './product.state';
import {
  loadProducts, loadProductsSuccess, loadProductsFailure,
  loadProductById, loadProductByIdSuccess, loadProductByIdFailure,
  addProduct, addProductSuccess, addProductFailure,
  updateProduct, updateProductSuccess, updateProductFailure,
  deleteProduct, deleteProductSuccess, deleteProductFailure
} from './product.actions';

export const productReducer = createReducer(
  initialState,
  on(loadProducts, state => ({ ...state, loading: true, error: null })),
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(loadProductById, state => ({ ...state, loading: true, error: null })),
  on(loadProductByIdSuccess, (state, { product }) => ({ ...state, selectedProduct: product, loading: false })),
  on(loadProductByIdFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(addProduct, state => ({ ...state, loading: true, error: null })),
  on(addProductSuccess, (state, { products }) => ({ ...state, products, loading: false })),
  on(addProductFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(updateProduct, state => ({ ...state, loading: true, error: null })),
  on(updateProductSuccess, state => ({ ...state, loading: false })),
  on(updateProductFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(deleteProduct, state => ({ ...state, loading: true, error: null })),
  on(deleteProductSuccess, state => ({ ...state, loading: false })),
  on(deleteProductFailure, (state, { error }) => ({ ...state, loading: false, error }))
);