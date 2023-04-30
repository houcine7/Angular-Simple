import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './auth/login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'clients',
        component: CustomerComponent,
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
