import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookServiceService } from 'src/app/services/book-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  searchResult: any

  constructor(
    private _modalService: NgbModal,
    private _service: BookServiceService,
    private _flashMessages: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  search = (text: Observable<string>) => {
    return text.pipe(debounceTime(200), switchMap(term => {
      return this._service.mainSearch({ term: term });
    }));

  };
  formatter = (searchedResult: { name: string }) => {
    if (searchedResult.hasOwnProperty('author')) {
      // this._emitService.setSearchedBookOrAuthor(searchedResult);
      this._router.navigate([`book/${searchedResult.name}`]);
    } else {
      // this._emitService.setSearchedBookOrAuthor(searchedResult);
      this._router.navigate([`author/${searchedResult.name}`]);
    };
    return searchedResult.name;
  };
  submit({ valid, value }) {
    if (valid) {
      this._router.navigate([`/searcheditems/${value.mainSearch}`]);
    }
  }

}
