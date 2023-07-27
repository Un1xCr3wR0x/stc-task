import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product/product.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { ProductModalComponent } from './product-modal/product-modal/product-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ToastType } from 'src/app/core/enums/toast-type.enum';
import { LocalizationService } from 'src/app/core/services/localization/localization.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    TranslateModule,
    ProductModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'actions'];
  data = new MatTableDataSource<Product>();
  private destroySubject: Subject<void> = new Subject();


  isRateLimitReached: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    public loadingService: LoadingService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private localizationService:LocalizationService
  ) {}

  ngOnInit(): void {
    console.log(this.paginator)
    this.getallProducts();
  }

  /**
   * get all products and start pagination after it
   */
  getallProducts(): void {
    this.productService.getAllProducts().pipe(
      takeUntil(this.destroySubject)
    ).subscribe((res) => {
      this.data = new MatTableDataSource<Product>(res);
      this.paginator._intl.itemsPerPageLabel = this.localizationService.instant('DASHBOARD.TABLE.PAGINATION_TEXT')
      this.data.paginator = this.paginator;
    });
  }

  /**
   * delete product method that will navigate to the product edit page
   */
  deleteProduct(productId: number):void {
    this.productService
      .deleteProduct(productId).pipe(
        takeUntil(this.destroySubject)
      )
      .subscribe(() => {
        this.toastService.openToast({
          message:'Product Deleted Successfully.',
          type:ToastType.Success
        })
      });
  }

  /**
   * edit product method that will navigate to the product edit page
   */
  editProduct(product: Product):void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { product },
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroySubject)
    ).subscribe(() => {
      this.toastService.openToast({
        message:'Product Updated Successfully.',
        type:ToastType.Success
      })
    });
  }

  /**
   * start the add new product cycle
   */
  onAddNewProduct():void {
    const dialogRef = this.dialog.open(ProductModalComponent);

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroySubject)
    ).subscribe((result) => {
      this.toastService.openToast({
        message:'Product Added Successfully.',
        type:ToastType.Success
      })
    });
  }

  ngOnDestroy() {
    // clean up
    this.destroySubject.next()
  }
}
