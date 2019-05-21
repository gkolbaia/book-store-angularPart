import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { EmitService } from 'src/app/services/emit.service';
import { Book } from 'src/app/models/book';
import { debounceTime, switchMap, tap, map } from 'rxjs/operators';
import { pipe, of, Observable } from 'rxjs';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  book: Book;
  error404: boolean = false;
  x: Observable<any>;
  authorImageUrl: any;
  imagePath: string;
  bookPrice: number;
  booksByCategory: Book[]
  littleArray: object[] = [];
  bigArray: object[] = [];
  slideNumber: number = 0;
  constructor(
    public _activatedRouter: ActivatedRoute,
    private _services: BookServiceService,
    private _emitService: EmitService,
  ) { }

  ngOnInit() {
    this.getBookService(() => {
      this.slide()
    })
  };
  getBookService(cb) {
    var name = this._activatedRouter.snapshot.params['name'];
    this._services.getBookByName({ name }).subscribe(
      res => {
        this.book = JSON.parse(JSON.stringify(res));
        if (this.book.sale > 0) {
          this.bookPrice = this.book.price - this.book.price * this.book.sale / 100
        } else {
          this.bookPrice = this.book.price
        }
        this.imagePath = this.book['posterPath'];
        cb();
      }
    )
  }
  slide() {
    this._services.getBooksByCategory(this.book).subscribe(
      res => {
        this.bigArray = [];
        this.littleArray = []
        this.booksByCategory = (JSON.parse(JSON.stringify(res)));
        this.booksByCategory.forEach((books, index) => {
          if (this.book.name === books.name) {
            this.booksByCategory.splice(index, 1)
          }
        });
        if (this.booksByCategory.length > 0) {
          for (let i = 0; i <= Math.ceil(this.booksByCategory.length / 4); i++) {
            if (this.booksByCategory.length > 4) {
              for (let i = 0; i < 4; i++) {
                if (this.booksByCategory.length > 0) {
                  this.littleArray.push(this.booksByCategory[0]);
                  this.booksByCategory.shift();
                } else {
                  break
                }
              }
              this.bigArray.push(this.littleArray);
              this.littleArray = []
            } else {
              var iteration = this.booksByCategory.length
              for (let i = 0; i <= iteration; i++) {
                if (this.booksByCategory.length > 0) {
                  this.littleArray.push(this.booksByCategory[0]);
                  this.booksByCategory.shift();
                } else {
                  break
                }
              }
              this.bigArray.push(this.littleArray);
              this.littleArray = []
            }
          }
        } else { this.bigArray = [] }
      }
    )
  }
  nextSlide() {
    if (this.slideNumber < this.bigArray.length - 1) {
      this.slideNumber += 1
    } else {
      this.slideNumber = 0
    }
  };
  prevSlide() {
    if (this.slideNumber > 0) {
      this.slideNumber -= 1;
    } else {
      this.slideNumber = this.bigArray.length - 1;
    }
  };
  checkSession() {
    this._services.getLoggedInUser().pipe(map(res => { console.log(res) }))
  }

}


