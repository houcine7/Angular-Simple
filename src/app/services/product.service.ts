import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // attributes
  private products: Product[];

  // constructor
  constructor() {
    this.products = [
      {
        id: 1,
        name: 'aripods bw55',
        price: '712 MAD',
        desc: 'the ultimate airpods bw55 best sounds and best shapes & colors',
      },
      {
        id: 2,
        name: 'keynoard dragon fire 7',
        price: '1500 MAD',
        desc: 'take control over colors and over sounds and speed of your keyboard',
      },
      {
        id: 3,
        name: 'J88 graphic card',
        price: '5000 MAD',
        desc: 'gaming is now more efficient and easier with our product',
      },
    ];
  }

  //methods

  getProducts = (): Observable<Product[]> => {
    //return throwError(() => new Error("can't get products"));
    return of(this.products);
  };

  // delete product

  deleteProduct = (id: number): Observable<boolean> => {
    this.products = this.products.filter((p) => p.id != id);
    return of(true);
  };
}
