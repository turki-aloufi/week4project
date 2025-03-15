import { createAction, props } from '@ngrx/store';
import { Product, ProductDto } from '../../services/product/product.service';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: ProductDto }>()
);
export const addProductFailure = createAction(
  '[Product] Add Product Failure',
  props<{ error: string }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ id: number; product: ProductDto }>()
);
export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: string }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: number }>()
);
export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ id: number }>()
);
export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: string }>()
);