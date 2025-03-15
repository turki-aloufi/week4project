import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';


export const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'orders', component: OrderComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];