import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  //
  editPrFormGrp!: FormGroup;
  idProduct!: number;

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) {
    //
  }

  handelUpdate() {
    let pr = this.editPrFormGrp.value;
    pr.id = this.idProduct;

    this.productService.updateProduct(pr).subscribe({
      next: (data) => {
        alert('Product with id' + pr.id + 'updated successfully');
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  desplayedError = (field: string, error: ValidationErrors): string => {
    return this.productService.desplayedError(field, error);
  };

  ngOnInit(): void {
    let idProduct = this.router.snapshot.params['id'];

    console.log(idProduct);

    this.productService.getProduct(idProduct).subscribe({
      next: (data) => {
        console.log('.....');

        this.idProduct = data.id;
        this.editPrFormGrp = this.fb.group({
          name: this.fb.control(data.name, [
            Validators.required,
            Validators.minLength(4),
          ]),
          price: this.fb.control(data.price.split(' ')[0], [
            Validators.required,
          ]),
          desc: this.fb.control(data.desc),
          promoted: this.fb.control(data.promoted),
        });
      },
      error: (error) => {
        //
        console.log(error + '-----');
      },
    });
  }
}
