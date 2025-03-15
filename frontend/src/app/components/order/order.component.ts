import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order, OrderDto } from '../../services/order/order.service'; 
import * as OrderActions from '../../state/order/order.actions';
import { AppState } from '../../state/order/order.state';
import { selectAllOrders } from '../../state/order/order.selector';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orders$: Observable<Order[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  addForm: FormGroup;
  updateForm: FormGroup;
  showAddForm = false;
  showUpdateForm = false;
  selectedOrderId: number | null = null;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.orders$ = this.store.select(state => selectAllOrders(state.orders));
    this.loading$ = this.store.select(state => state.orders.loading);
    this.error$ = this.store.select(state => state.orders.error);

    this.addForm = this.fb.group({
      orderProducts: this.fb.array([], Validators.required) 
    });

    this.updateForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      orderProducts: this.fb.array([], Validators.required)
    });
  }

  ngOnInit() {
    this.store.dispatch(OrderActions.loadOrders());
  }

  get addOrderProducts() {
    return this.addForm.get('orderProducts') as FormArray;
  }

  get updateOrderProducts() {
    return this.updateForm.get('orderProducts') as FormArray;
  }

  addProduct(form: FormGroup, productId?: number, quantity?: number) {
    const orderProducts = form.get('orderProducts') as FormArray;
    orderProducts.push(this.fb.group({
      productId: [productId || '', Validators.required],
      quantity: [quantity || '', [Validators.required, Validators.min(1)]]
    }));
  }

  removeProduct(form: FormGroup, index: number) {
    const orderProducts = form.get('orderProducts') as FormArray;
    orderProducts.removeAt(index);
  }

  showAddOrderForm() {
    this.showAddForm = true;
    this.showUpdateForm = false;
    this.addForm.reset();
    this.addOrderProducts.clear();
  }

  addOrder() {
    if (this.addForm.valid) {
      const order: OrderDto = {
        products: this.addForm.value.orderProducts // Map to 'products'
      };
      this.store.dispatch(OrderActions.addOrder({ order }));
      this.showAddForm = false;
    }
  }

  showUpdateOrderForm(order: Order) {
    this.showUpdateForm = true;
    this.showAddForm = false;
    this.selectedOrderId = order.id;
    this.updateForm.patchValue({ id: order.id });
    this.updateOrderProducts.clear();
    order.orderProducts.forEach(op => {
      this.addProduct(this.updateForm, op.product.id, op.quantity);
    });
  }

  updateOrder() {
    if (this.updateForm.valid && this.selectedOrderId !== null) {
      const id = this.selectedOrderId;
      const order: OrderDto = {
        products: this.updateForm.value.orderProducts // Map to 'products'
      };
      this.store.dispatch(OrderActions.updateOrder({ id, order }));
      this.showUpdateForm = false;
      this.selectedOrderId = null;
    }
  }

  deleteOrder(id: number) {
    this.store.dispatch(OrderActions.deleteOrder({ id }));
  }

  cancelForm() {
    this.showAddForm = false;
    this.showUpdateForm = false;
    this.selectedOrderId = null;
  }
}