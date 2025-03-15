import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product/product.service';
import {
  loadProducts, loadProductsSuccess, loadProductsFailure,
  loadProductById, loadProductByIdSuccess, loadProductByIdFailure,
  addProduct, addProductSuccess, addProductFailure,
  updateProduct, updateProductSuccess, updateProductFailure,
  deleteProduct, deleteProductSuccess, deleteProductFailure
} from './product.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getAllProducts().pipe(
          map(products => loadProductsSuccess({ products })),
          catchError(error => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductById),
      mergeMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          map(product => loadProductByIdSuccess({ product })),
          catchError(error => of(loadProductByIdFailure({ error: error.message })))
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      mergeMap(({ product }) =>
        this.productService.addProduct(product).pipe(
          map(products => addProductSuccess({ products })),
          catchError(error => of(addProductFailure({ error: error.message })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      mergeMap(({ id, product }) =>
        this.productService.updateProduct(id, product).pipe(
          switchMap(() => [updateProductSuccess(), loadProducts()]), 
          catchError(error => of(updateProductFailure({ error: error.message })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          switchMap(() => [deleteProductSuccess(), loadProducts()]), 
          catchError(error => of(deleteProductFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productService: ProductService) {}
}