import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  categories: string[] = [];
  products: Product[] = [];
  private destroySubject: Subject<void> = new Subject();

  selectedCategory: string = '';

  constructor(public productService: ProductService, private router: Router) {}

  ngOnInit() {
    if (this.productService.categoryName.value.length === 0) {
      this.productService.setCategoryName('electronics');
    }
    this.productService.categoryName
      .pipe(takeUntil(this.destroySubject))
      .subscribe((res) => {
        console.log(res);
        this.selectedCategory = res;
        this.getCategoryProduct();
      });
  }

  getAllCategories() {
    this.productService
      .getAllCategories()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  getCategoryProduct() {
    this.productService
      .getCategoryProducts(this.selectedCategory)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((products) => {
        this.products = products;
      });
  }

  ngOnDestroy() {
    // clean up
    this.destroySubject.next();
  }
}
