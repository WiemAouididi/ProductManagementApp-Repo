import { Component, Input } from '@angular/core';
import { MatFormField } from "@angular/material/form-field";
import { Product } from "../../models/product.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  productForm!: FormGroup;
  productId?: number;
  isEditMode = false;
  product!: Product;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
    });

    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      this.productId = +params.get('id');
      if (this.productId) {
        this.isEditMode = true;
        this.productService.getProductById(this.productId).subscribe(
          (product: Product) => {
            this.product = product;
            this.productForm.patchValue({
              title: product.title,
              description: product.description,
              price: product.price,
            });
          },
          (error) => {
            console.error('Failed to retrieve product:', error);
          }
        );
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      if (this.isEditMode && this.product) {
        formData.id = this.product.id;
        this.productService.updateProduct(formData).then(res => {
            console.log("aaaaaaaaaaaaaa")
            this.router.navigate(['/products', res?.id])
          }
        );
      } else {
        this.productService.addProduct(formData).subscribe(
          () => {
            console.log('Product added successfully');
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      }
    }

  }
}
