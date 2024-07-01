import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})

export class ProductDetailComponent implements OnInit {
  @Input() product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = Number(params['id']); // Convert id to number if necessary
      this.loadProduct(productId);
    });
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId)
      .subscribe(product => {
        this.product = product;
      });
  }

  displayRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    let stars = '';
    stars += '★'.repeat(fullStars);
    stars += '☆'.repeat(halfStars);
    stars += '✩'.repeat(emptyStars);

    return stars;
  }

  openProductForm(product: Product) {
    // Navigate to product form component with product details for editing
    this.router.navigate(['/product-form', product.id]);
  }
}
