import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './auth/login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'clients',
        component: CustomerComponent,
      },
      {
        path: 'products/add-new',
        component: AddProductComponent,
      },
      {
        path: 'products/:id',
        component: EditProductComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
