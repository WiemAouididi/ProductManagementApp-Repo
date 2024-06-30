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

  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.apiUrl).pipe(
      map(response => response.products)
    );
  }

  getProductById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }
}
