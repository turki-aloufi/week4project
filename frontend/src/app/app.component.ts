import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component'
import { OrderComponent } from './order/order.component'

@Component({
  selector: 'app-root',
  imports: [ProductComponent, OrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
