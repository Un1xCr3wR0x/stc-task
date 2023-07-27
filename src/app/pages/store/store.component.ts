import { Component,OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProductService } from 'src/app/core/services/product/product.service';
import {Subject,takeUntil} from 'rxjs'
@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule,HeaderComponent,RouterOutlet,RouterModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit,OnDestroy {
  categories: string[] = [];
  private destroySubject: Subject<void> = new Subject();
  constructor(private productService:ProductService,private router:Router){}
  ngOnInit() {
   this.getAllCategories() 
  }
  getAllCategories() {
    this.productService.getAllCategories().pipe(takeUntil(this.destroySubject)).subscribe((categories) => {
      this.categories = categories;
    });
  }
  selectCategory(category:string) {
    this.router.navigate(['/store/products/'])
    this.productService.setCategoryName(category);
  }

  ngOnDestroy() {
    // clean up
    this.destroySubject.next();
  }
}
