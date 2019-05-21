import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-books-category',
  templateUrl: './books-category.component.html',
  styleUrls: ['./books-category.component.css']
})
export class BooksCategoryComponent implements OnInit {
  booksByCategory: Book[];
  category: string
  constructor(
    private _service: BookServiceService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBooksByCategory()
  }
  getBooksByCategory() {
    this.category = this._activatedRoute.snapshot.params['category']
    this._service.getBooksByCategory({ categories: [{ category: this.category }] }).subscribe(
      res => {
        this.booksByCategory = JSON.parse(JSON.stringify(res));
      },
      err => { console.log(err) }
    )
  }
  capitalLetter(string) {
    return this._service.capitalizeLetters(string)
  }
  capitalizeFirstLetter(string) {
    return this._service.capitalizeFirstLetter(string)
  }
}
