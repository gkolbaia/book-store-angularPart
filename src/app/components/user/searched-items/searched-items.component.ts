import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-searched-items',
  templateUrl: './searched-items.component.html',
  styleUrls: ['./searched-items.component.css']
})
export class SearchedItemsComponent implements OnInit {
  searchedItems: any;
  authors: Author[] = [];
  books: Book[] = [];
  searchTerm: string;
  error404: boolean;
  constructor(
    private _service: BookServiceService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mainSearch();
  }
  mainSearch() {
    this.searchTerm = this._activatedRoute.snapshot.params['term'];
    this._service.mainSearch({ term: this.searchTerm }).subscribe(
      res => {
        this.searchedItems = JSON.parse(JSON.stringify(res));
        console.log(this.searchedItems);
        if (this.searchedItems.length === 0) {
          this.error404 = true
        } else {
          this.searchedItems.forEach(element => {
            if (element.hasOwnProperty('author')) {
              this.books.push(element);
            } else {
              this.authors.push(element);
            }
          });
        }
      },
      err => {
        { if (err.status === 404) { this.error404 = true } }
      }
    )
  }
  capitalLetter(string) {
    return this._service.capitalizeLetters(string);
  }

}
