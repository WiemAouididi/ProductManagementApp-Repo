import { Component, OnInit } from '@angular/core';
import { Product } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { MatCard, MatCardActions, MatCardContent } from "@angular/material/card";
import { CurrencyPipe } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { Router } from "@angular/router";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    CurrencyPipe,
    MatCardContent,
    MatIcon
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }
}
