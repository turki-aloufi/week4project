import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
}

export interface OrderProduct {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  orderDate: string;
  totalPrice: number;
  orderProducts: OrderProduct[];
}

export interface OrderProductDto {
  productId: number;
  quantity: number;
}

export interface OrderDto {
  products: OrderProductDto[]; 
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://localhost:7160/api/Order'; 

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: OrderDto): Observable<Order> { 
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrder(id: number, order: OrderDto): Observable<void> { 
    return this.http.put<void>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}