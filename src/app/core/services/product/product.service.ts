import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProductRequest } from '../../interfaces/product-request.interface';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  categoryName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  setCategoryName(category:string):void {
    this.categoryName.next(category)
  }
  getCategoryName():Observable<string> {
    return this.categoryName.asObservable()
  }
  getAllProducts():Observable<any> {
    return this.http.get('https://fakestoreapi.com/products');
  }

  addNewProduct(data: ProductRequest):Observable<any> {
    let payload = {
      title: data.title,
      descripton: data.description,
      price: data.price,
      image: {}, // here comes the image base64 or blob or whatever kind u want
      rating: {
        rate: data.rating,
        count: data.count,
      },
    };
    return this.http
      .post('https://fakestoreapi.com/products', payload);
  }

  editProduct(productId: number, data: ProductRequest):Observable<any> {
    let payload = {
      title: data.title,
      descripton: data.description,
      price: data.price,
      image: {}, // here comes the image base64 or blob or whatever kind u want
      rating: {
        rate: data.rating,
        count: data.count,
      },
    };
    return this.http.put(
      `https://fakestoreapi.com/products/${productId}`,
      payload
    );
  }

  deleteProduct(productId: number):Observable<any> {
    return this.http.delete(`https://fakestoreapi.com/products/${productId}`);
  }

  getAllCategories():Observable<any> {
    return this.http.get('https://fakestoreapi.com/products/categories');
  }

  getCategoryProducts(category: string):Observable<any> {
    return this.http.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
  }

  getProductByid(id:number):Observable<any> {
    return this.http.get(
      `https://fakestoreapi.com/products/${id}`
    );
  }
}
