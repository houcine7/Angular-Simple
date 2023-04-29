import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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
}
