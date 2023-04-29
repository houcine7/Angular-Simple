import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { ProductsComponent } from './products/products.component';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  declarations: [
    // where we declare our web components
    AppComponent,
    HeroComponent,
    ProductsComponent,
    CustomerComponent,
  ],
  imports: [
    // here where we decalre thr modules that we are usig

    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    //services : where we can decalre services
  ],
  bootstrap: [
    // here we decalre the root component

    AppComponent,
  ],
})
export class AppModule {}
