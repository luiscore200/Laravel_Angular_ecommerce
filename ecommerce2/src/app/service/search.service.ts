import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private categoryQuerySubject: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  public searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();
  public categoryQuery$: Observable<number> = this.categoryQuerySubject.asObservable();

  constructor() {}

  setSearchQuery(query: string): void {
   this.searchQuerySubject.next(query);
 //   console.log(this.searchQuerySubject);
  }

  setCategoryQuery(query:number): void {
    this.categoryQuerySubject.next(query);
  //   console.log(this.searchQuerySubject);
   }
}
