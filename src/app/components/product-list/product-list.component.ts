import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { MatCard, MatCardActions, MatCardContent } from "@angular/material/card";
import { CurrencyPipe } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { Router } from "@angular/router";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { SharedService } from "../../services/shared.service";
import { CartService } from "../../services/cart.service";
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    CurrencyPipe,
    MatCardContent,
    MatIcon,
    MatPaginator,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  totalProducts = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService,
              private router: Router,
              private sharedService: SharedService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.sharedService.currentProducts.subscribe(products => this.products = products);
  }

  loadProducts(): void {
    const skip = this.pageIndex * this.pageSize;
    this.productService.getProducts(skip, this.pageSize).subscribe(
      data => {
        this.products = data.products;
        this.totalProducts = data.total;
      }
    );

  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadProducts();
  }

  isNewProduct(product: Product): boolean {
    if (product.meta.createdAt) {
      const today = new Date();
      const productDate = new Date(product.meta.createdAt);
      const diffDays = Math.ceil((today.getTime() - productDate.getTime()) / (1000 * 3600 * 24));
      return diffDays <= 3;
    }
    return false;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
