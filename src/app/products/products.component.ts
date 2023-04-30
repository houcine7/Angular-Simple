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
  totalPages!: number;
  currentPage: number = 0;
  sizePages: number = 6;
  error!: any;
  showConfirmBox: boolean = false;
  productId!: number;
  searchFormGroup!: FormGroup;
  isSearch: boolean = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null),
    });

    this.getPageProducts();
  }

  // methods
  getProducts(): void {
    this.productService.getProducts().subscribe({
      // NO ERROR :
      next: (data) => {
        console.log(data);

        this.products = data;
      },

      // AN ERROR OCCURED
      error: (err) => {
        this.error = err;
      },

      //
    });
  }

  getPageProducts(): void {
    this.isSearch = false;

    this.productService
      .getProductPage(this.sizePages, this.currentPage)
      .subscribe({
        // NO ERROR :
        next: (data) => {
          console.log(data);

          this.products = data.products;
          this.totalPages = data.totalPages;
        },

        // AN ERROR OCCURED
        error: (err) => {
          this.error = err;
        },

        //
      });
  }

  getPage(page: number): void {
    this.currentPage = page;

    if (!this.isSearch) {
      this.getPageProducts();
    } else {
      console.log(this.currentPage);

      this.handelSearch();
    }
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
    this.isSearch = true;

    if (
      this.searchFormGroup.value?.keyword != null &&
      this.searchFormGroup.value?.keyword != ''
    ) {
      this.productService
        .searchProducts(
          this.searchFormGroup.value?.keyword,
          this.currentPage,
          this.sizePages
        )
        .subscribe({
          next: (data) => {
            this.products = data.products;
            this.totalPages = data.totalPages;
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.getPageProducts();
    }
  }
}
