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
        promoted: true,
        desc: 'the ultimate airpods bw55 best sounds and best shapes & colors',
      },
      {
        id: 2,
        name: 'keynoard dragon fire 7',
        price: '1500 MAD',
        promoted: false,
        desc: 'take control over colors and over sounds and speed of your keyboard',
      },
      {
        id: 3,
        name: 'J88 graphic card',
        price: '5000 MAD',
        promoted: false,
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
  //set product promotion

  setPromoted(id: number): Observable<boolean> {
    this.products = this.products.map((p) => {
      if (p.id == id) {
        return { ...p, promoted: !p.promoted };
      } else {
        return p;
      }
    });

    return of(true);
  }

  //
  searchProducts(keyword: string): Observable<Product[]> {
    this.products = this.products = this.products.filter(
      (p) => p.name.includes(keyword) || p.desc?.includes(keyword)
    );

    return of(this.products);
  }
}
