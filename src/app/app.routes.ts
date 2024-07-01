import { Routes } from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductDetailComponent} from "./components/product-details/product-detail.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: ShoppingCartComponent },
];
