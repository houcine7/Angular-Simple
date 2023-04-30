import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ProducatPage, Product } from '../models/product.model';

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

    let counter = 3;
    for (let i = 0; i < 10; i++) {
      this.products.push({
        id: ++counter,
        name: 'Usb cable',
        price: '20 MAD',
        promoted: true,
        desc: 'the cable that will never be changed',
      });
      this.products.push({
        id: ++counter,
        name: 'keynoard dragon fire 7',
        price: '1500 MAD',
        promoted: false,
        desc: 'take control over colors and over sounds and speed of your keyboard',
      });
    }
  }

  //methods

  getProducts = (): Observable<Product[]> => {
    //return throwError(() => new Error("can't get products"));
    return of(this.products);
  };

  getProductPage(size: number, page: number): Observable<ProducatPage> {
    const start = size * page;
    let totalPages = ~~(this.products.length / size);

    if (totalPages % 2 != 0) totalPages++;

    const pageProducts = this.products.slice(start, start + size);

    return of({
      products: pageProducts,
      totalPages: totalPages,
      size: size,
      page: page,
    });
  }

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
  searchProducts(
    keyword: string,
    page: number,
    size: number
  ): Observable<ProducatPage> {
    let start = page * size;

    let filtred = this.products.filter(
      (p) => p.name.includes(keyword) || p.desc?.includes(keyword)
    );

    console.log(start);

    let totalPages = ~~(filtred.length / size);

    if (filtred.length % size != 0) totalPages++;

    return of({
      page: page,
      size: size,
      products: filtred.slice(start, start + size),
      totalPages: totalPages,
    });
  }
}
