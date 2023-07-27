import { Component,OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { ProductService } from 'src/app/core/services/product/product.service';
import { Product } from 'src/app/core/interfaces/product.interface';
import {MatIconModule} from '@angular/material/icon';
import {Subject,takeUntil} from 'rxjs'
@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit,OnDestroy {
  productId: number;
  productDetails: Product;
  private destroySubject: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private title:Title
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.productId = Number(this.route.snapshot.paramMap.get('id'));
      this.getProductDetails();
    }
  }

  getProductDetails() {
    this.productService
      .getProductByid(this.productId)
      .pipe(takeUntil(this.destroySubject)).subscribe((product) => {
        this.productDetails = product;
        this.title.setTitle(product.title)
      });
  }

  showIcon(index:number) {
    if (this.productDetails.rating.rate >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  ngOnDestroy() {
    // clean up
    this.destroySubject.next();
  }
}
