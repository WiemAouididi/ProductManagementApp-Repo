import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(skip: number, limit: number): Observable<{ products: Product[], total: number }> {
    return this.http.get<{ products: Product[], total: number }>(`${this.apiUrl}?skip=${skip}&limit=${limit}`);
  }

  getProductById(productId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.apiUrl).pipe(
      map(response => response.products)
    );
  }

  searchProducts(products: Product[], name: string): Product[] {
    return products.filter(product => product.title.toLowerCase().includes(name.toLowerCase()));
  }

  updateProduct(productData: any): Observable<any> {
    const url = `${this.apiUrl}/products/${productData.id}`; // Adjust URL as per your API structure
    return this.http.put(url, productData);
  }

  addProduct(productData: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, productData);
  }
}
