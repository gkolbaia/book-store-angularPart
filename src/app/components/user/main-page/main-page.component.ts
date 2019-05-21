import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { BookServiceService } from 'src/app/services/book-service.service';
import { Router } from '@angular/router';
import { EmitService } from 'src/app/services/emit.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  searchResult: any;
  books: Book[]


  constructor(
    private _services: BookServiceService,
    private _router: Router,
    private _emitService: EmitService
  ) { }

  ngOnInit() {
    this.getBooks()
  }
  getBooks() {
    this._services.getBooks().subscribe(
      books => {
        this.books = JSON.parse(JSON.stringify(books));
        console.log(this.books)
      },
      err => { console.log(err) }
    )
  }
  capitalLetter(string) {
    return this._services.capitalizeLetters(string);
  }


}
