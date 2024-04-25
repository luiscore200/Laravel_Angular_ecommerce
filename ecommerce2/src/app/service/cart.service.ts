import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { ObjCart } from '../interface/obj-cart';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: ObjCart[] = [];
  private productsSubject: BehaviorSubject<ObjCart[]> = new BehaviorSubject<ObjCart[]>([]);

  constructor() {
    this.loadCartFromLocalStorage();
  }

  add(product: Product): void {
    const existingProduct = this.products.find(p => p.product.id === product.id);
    if (existingProduct) {
      // Si el producto ya existe en el carrito, incrementa la cantidad
      existingProduct.count += 1;
      existingProduct.selected=true;
    } else {
      // Si el producto no existe en el carrito, agrégalo
      const newProduct: ObjCart = {
        selected: true,
        count: 1,
        product: product
      };
      this.products.push(newProduct);
    }
    // Guarda el carrito en el almacenamiento local si está disponible
    if (typeof localStorage !== 'undefined') {
      this.saveCartToLocalStorage();
    }
    // Emite los cambios
    this.productsSubject.next(this.products);
  }

  getProducts(): Observable<ObjCart[]> {
    return this.productsSubject.asObservable();
  }

  updateCart(products: ObjCart[]): void {
    this.products = products;
    if (typeof localStorage !== 'undefined') {
      this.saveCartToLocalStorage();
    }
  }

  deselectedAll(){

    this.products.forEach(product => {
   product.selected=false;
    });
    if (typeof localStorage !== 'undefined') {
      this.saveCartToLocalStorage();
    }
    


  }


  deleteAll(index: number): void {
    this.products.splice(index, 1);
    // Guarda el carrito en el almacenamiento local si está disponible
    if (typeof localStorage !== 'undefined') {
      this.saveCartToLocalStorage();
    }
    this.productsSubject.next(this.products);
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.products));
  }

  private loadCartFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.products = JSON.parse(storedCart);
        this.productsSubject.next(this.products);
      }
    }
  }

  reset(): void {

    this.products = [];
  
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('cart');
    }
    this.productsSubject.next(this.products);
  }

}