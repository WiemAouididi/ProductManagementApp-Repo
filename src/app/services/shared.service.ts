import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private productsSource = new BehaviorSubject<Product[]>([]);
  currentProducts = this.productsSource.asObservable();

  changeProducts(products: Product[]) {
    this.productsSource.next(products);
  }
}
