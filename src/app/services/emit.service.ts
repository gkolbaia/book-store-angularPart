import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitService {
  private searchedBookOrAuthor = new BehaviorSubject<any>(null);
  data = this.searchedBookOrAuthor.asObservable();
  constructor() { }
  setSearchedBookOrAuthor(result:any){
    this.searchedBookOrAuthor.next(result);
  }
}
