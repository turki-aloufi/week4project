// src/app/product/product.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, ProductDto } from '../services/product/product.service';
import {
  loadProducts, loadProductById, addProduct, updateProduct, deleteProduct
} from '../state/product/product.actions';
import { ProductState } from '../state/product/product.state';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  addForm: FormGroup;
  updateForm: FormGroup;
  showAddForm = false;
  showUpdateForm = false;

  constructor(
    private store: Store<{ products: ProductState }>,
    private fb: FormBuilder
  ) {
    this.products$ = this.store.select(state => state.products?.products || []);
    this.selectedProduct$ = this.store.select(state => state.products?.selectedProduct || null);
    this.loading$ = this.store.select(state => state.products?.loading || false);
    this.error$ = this.store.select(state => state.products?.error || null);

    // Initialize Add Form
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });

    // Initialize Update Form
    this.updateForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required], // Disabled for display
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
  }

  getProduct(id: number) {
    this.store.dispatch(loadProductById({ id }));
  }

  showAddProductForm() {
    this.showAddForm = true;
    this.showUpdateForm = false;
    this.addForm.reset();
  }

  addProduct() {
    if (this.addForm.valid) {
      const product: ProductDto = this.addForm.value;
      this.store.dispatch(addProduct({ product }));
      this.showAddForm = false;
    }
  }

  showUpdateProductForm(product: Product) {
    this.showUpdateForm = true;
    this.showAddForm = false;
    this.updateForm.patchValue({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    });
  }

  updateProduct() {
    if (this.updateForm.valid) {
      const id = this.updateForm.getRawValue().id; // Use getRawValue to get disabled field
      const product: ProductDto = {
        title: this.updateForm.value.title,
        price: this.updateForm.value.price,
        description: this.updateForm.value.description,
        category: this.updateForm.value.category,
        image: this.updateForm.value.image
      };
      this.store.dispatch(updateProduct({ id, product }));
      this.showUpdateForm = false;
    }
  }

  deleteProduct(id: number) {
    this.store.dispatch(deleteProduct({ id }));
  }

  cancelForm() {
    this.showAddForm = false;
    this.showUpdateForm = false;
  }
}