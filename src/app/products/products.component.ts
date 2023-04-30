import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //
  products!: Product[];
  error!: any;
  showConfirmBox: boolean = false;
  productId!: number;
  searchFormGroup!: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null),
    });

    this.getProducts();
  }

  // methods
  getProducts(): void {
    this.productService.getProducts().subscribe({
      // NO ERROR :
      next: (data) => {
        this.products = data;
      },

      // AN ERROR OCCURED
      error: (err) => {
        this.error = err;
      },

      //
    });
  }

  deleteProduct(id: number) {
    this.showConfirmBox = true;
    this.productId = id;
  }
  cancelDelete(): void {
    this.showConfirmBox = false;
    this.productId = 0;
  }

  deleteProductConfirmed(): void {
    this.showConfirmBox = false;
    this.productService.deleteProduct(this.productId).subscribe({
      next: (data) => {
        this.products = this.products.filter((p) => p.id != this.productId);
      },
    });
  }

  setProductPromotion(product: Product): void {
    const promoted = product.promoted;

    this.productService.setPromoted(product.id).subscribe({
      next: (data) => {
        product.promoted = !promoted;
      },
      error: (err) => {
        console.log(err);
        this.error = err;
      },
    });
  }

  // Search for products

  handelSearch(): void {
    if (this.searchFormGroup.value?.keyword != null) {
      this.productService
        .searchProducts(this.searchFormGroup.value?.keyword)
        .subscribe({
          next: (data) => {
            this.products = data;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
