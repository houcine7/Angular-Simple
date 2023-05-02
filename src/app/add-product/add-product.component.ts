import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  addProFromGrp: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productSerivce: ProductService,
    private router: Router
  ) {
    this.addProFromGrp = this.fb.group({
      name: this.fb.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      price: this.fb.control(null, [Validators.required]),
      desc: this.fb.control(''),
      promoted: this.fb.control(false),
    });
  }

  handelSubmit = (): void => {
    let product = this.addProFromGrp.value;
    this.productSerivce.addProduct(product).subscribe({
      next: (data) => {
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  desplayedError = (field: string, error: ValidationErrors): string => {
    return this.productSerivce.desplayedError(field, error);
  };
}
