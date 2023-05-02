import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ProducatPage, Product } from '../models/product.model';
import { ValidationErrors } from '@angular/forms';

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
    let total = ~~(this.products.length / size);
    console.log(this.products.length + '----' + total);

    if (this.products.length % size != 0) total++;

    const pageProducts = this.products.slice(start, start + size);

    return of({
      products: pageProducts,
      totalPages: total,
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

  getProduct(id: number): Observable<Product> {
    //
    let pr = this.products.find((p) => p.id == id);

    if (pr != undefined) {
      return of(pr);
    }
    return throwError(() => new Error('Product not found'));
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

  addProduct = (product: Product): Observable<Product> => {
    product.id = this.products.length + 1;

    this.products.push(product);
    console.log(this.products);

    return of(product);
  };

  //update product

  updateProduct = (product: Product): Observable<boolean> => {
    //

    this.products = this.products.map((p) => {
      if (p.id == product.id) {
        return product;
      } else {
        return p;
      }
    });

    return of(true);
  };

  //
  desplayedError = (field: string, error: ValidationErrors): string => {
    console.log(error);

    if (error['required']) return field + ' is required';
    else if (error['minlength'])
      return (
        field +
        ' must be at least ' +
        error['minlength']['requiredLength'] +
        ' characters'
      );
    else return '';
  };
}
