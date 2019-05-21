import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css']
})
export class AuthorPageComponent implements OnInit {
  author: Author;
  error404: boolean;
  bornDate: Date;
  deathDate: Date;
  //wasashleli
  books: any = [];
  bigArray: object[] = [];
  littleArray: Book[] = [];
  slideNumber: number = 0;


  constructor(
    public _activatedRoute: ActivatedRoute,
    public _services: BookServiceService
  ) { }

  ngOnInit() {
    this.getAuthor(() => {
      this.getAuthorsBooks()
    })
  };
  getAuthor(cb) {
    var name = this._activatedRoute.snapshot.params['name']
    this._services.getCurrentAuthor({ name }).subscribe(
      author => {
        this.author = JSON.parse(JSON.stringify(author));
        this.bornDate = new Date(this.author.dateOfBirth);
        this.deathDate = new Date(this.author.dateOfDeath);
        cb();
      }
    )
  }
  getAuthorsBooks() {
    this._services.getBooksByAuthor(this.author).subscribe(
      res => {
        this.bigArray = [];
        this.littleArray = []
        this.books = (JSON.parse(JSON.stringify(res)));
        if (this.books.length > 0) {
          for (let i = 0; i <= Math.ceil(this.books.length / 4); i++) {
            if (this.books.length > 4) {
              for (let i = 0; i < 4; i++) {
                if (this.books.length > 0) {
                  this.littleArray.push(this.books[0]);
                  this.books.shift();
                } else {
                  break
                }
              }
              this.bigArray.push(this.littleArray);
              this.littleArray = []
            } else {
              var iteration = this.books.length
              for (let i = 0; i < iteration; i++) {
                if (this.books.length > 0) {
                  this.littleArray.push(this.books[0]);
                  this.books.shift();
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
    console.log(this.slideNumber)
  };
  capitalLetter(string) {
    this._services.capitalizeLetters(string)
  };
}
