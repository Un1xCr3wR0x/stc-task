import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { isAdminGuard } from './core/guards/is-admin/is-admin.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { ProductsComponent } from './pages/products/products.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductsDetailsComponent } from './pages/products/products-details/products-details.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'store' },
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/product/:id',
        component: ProductsDetailsComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [isAdminGuard],
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
  },
];
