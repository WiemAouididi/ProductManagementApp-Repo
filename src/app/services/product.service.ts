import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {
  }

  getProducts(skip: number, limit: number): Observable<{ products: Product[], total: number }> {
    return this.http.get<{ products: Product[], total: number }>(`${this.apiUrl}?skip=${skip}&limit=${limit}`);
  }


  getProductById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }
}
