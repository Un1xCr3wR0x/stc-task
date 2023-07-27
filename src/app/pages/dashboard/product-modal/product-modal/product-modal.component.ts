import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Product } from 'src/app/core/interfaces/product.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductModalData } from 'src/app/core/interfaces/product-modal-data.interface';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  providers: [TranslateService, TranslateStore],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<void> = new Subject();
  productForm: FormGroup;
  selectedProduct: Product;
  selectedImage: File;
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModalData
  ) {}
  ngOnInit(): void {
    this.createProductForm();
    if (this.data) {
      this.selectedProduct = this.data.product;
      this.bindProductData();
    }
  }

  createProductForm() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      rating: ['', Validators.required],
      count: ['', Validators.required],
    });
  }

  handleImageUpload(event:Event): void {
    this.selectedImage = ((event.target as HTMLInputElement).files as FileList)[0];
    this.productForm.patchValue({ image: this.selectedImage });
    this.productForm.get('image')!!.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.selectedProduct) {
        this.productService
          .editProduct(this.selectedProduct.id, this.productForm.value)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((res) => {
            this.productForm.reset();
            this.dialogRef.close(true);
          });
      } else {
        this.productService
          .addNewProduct(this.productForm.value)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((res) => {
            this.dialogRef.close(true);
          });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  bindProductData() {
    if (this.selectedProduct) {
      this.productForm.setValue({
        title: this.selectedProduct.title,
        price: this.selectedProduct.price,
        description: this.selectedProduct.description,
        image: this.selectedProduct.image,
        rating: this.selectedProduct.rating.rate,
        count: this.selectedProduct.rating.count,
      });
    }
  }

  ngOnDestroy() {
    // clean up
    this.destroySubject.next();
  }
}
