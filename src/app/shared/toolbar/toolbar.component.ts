import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from "../../services/product.service";
import { SharedService } from "../../services/shared.service";
import { Product } from "../../models/product.model";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ToolbarComponent implements OnInit {
  searchControl = new FormControl('');
  allProducts: Product[] = [];
  filteredProducts: Observable<Product[]> = of([]);

  constructor(private productService: ProductService, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.allProducts = products;
      this.filteredProducts = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(query => this.filterProducts(query || ''))
      );

      // Subscribe to filteredProducts to ensure changes are detected
      this.filteredProducts.subscribe(filtered => {
        this.sharedService.changeProducts(filtered);
      });
    });
  }

  private filterProducts(query: string): Product[] {
    return this.productService.searchProducts(this.allProducts, query);

  }
}
