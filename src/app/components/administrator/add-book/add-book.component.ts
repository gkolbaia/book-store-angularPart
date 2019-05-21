// rogor movebno ro ragac Sheicavs amas mongoosshi
//true da false rogor davabrunebino roca serviss vidaxeb
import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { BookServiceService } from 'src/app/services/book-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/book';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  categories: []
  author: Author = {
    name: '',
    biography: '',
    dateOfBirth: null,
    dateOfDeath: null,

  };
  book: Book = {
    name: '',
    author: null,
    category: [],
    price: null,
    sale: null,
    description: '',
    publishDate: null
  };
  bookAuthor: Author;
  image: File = null;
  authorImage: File = null;
  imageValidation: boolean = true;
  authorImageValidation: boolean = true;
  authorTypeError: boolean;
  imageUrl: any;
  authorImageUrl: any



  constructor(
    private _service: BookServiceService,
    private _flashMessage: FlashMessagesService,
    private _modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this._service.getCategories().subscribe(
      res => {
        var x = JSON.stringify(res);
        var y = JSON.parse(x);
        y.forEach(category => {
          category.existance = false;
        });
        this.categories = y;
      },
      err => { console.log(err.error.message) }
    );
  }
  onAuthorSubmit({ valid, value }) {
    if (valid) {
      if (this.authorImageValidation) {
        var autorFormToSend = {};
        autorFormToSend['dateOfBirth'] = new Date(value.dateOfBirth)
        autorFormToSend['dateOfDeath'] = new Date(value.dateOfDeath);
        autorFormToSend['name'] = value.name;
        autorFormToSend['biography'] = value.biography
        autorFormToSend['categories'] = [];
        for (var category in value.categories) {
          if (value.categories[category]) {
            autorFormToSend['categories'].push({ category: category });
          }
        };
        this._service.addAuthor(autorFormToSend).subscribe(
          author => {
            this._modalService.dismissAll();
            var x = JSON.stringify(author);
            var y = JSON.parse(x);
            this.bookAuthor = y;
            console.log(this.bookAuthor)
            var authorImageForm = new FormData();
            authorImageForm.append('image', this.authorImage, this.bookAuthor['name'] + '.' + this.authorImage.name.split('.')[this.authorImage.name.split('.').length - 1]);
            this._service.saveAuthorPoster(authorImageForm).subscribe(
              image => { console.log(image) },
              err => { console.log(err) }
            )
          },
          err => {
            console.log(err);
          }
        );
      }
    } else {
      this._flashMessage.show('Fill in fields', {
        cssClass: 'alert-danger', timeout: 2500
      });
    }
  };
  onBookSubmit({ valid, value }) {
    this.authorTypeError = typeof (this.bookAuthor) === 'object' ? false : true

    if (valid) {
      if (this.imageValidation) {
        if (!this.authorTypeError) {
          var bookForm = {};
          bookForm['name'] = value.name;
          bookForm['author'] = this.bookAuthor;
          bookForm['price'] = value.price;
          bookForm['sale'] = value.sale;
          bookForm['description'] = value.description;
          if (value.publishDate) {
            bookForm['publishDate'] = new Date(value.publishDate);
          } else {
            bookForm['publishDate'] = null
          };
          bookForm['categories'] = []
          for (var category in value.categories) {
            if (value.categories[category]) {
              bookForm['categories'].push({ category: category });
            }
          };
          const bookFormTosend = new FormData();
          bookFormTosend.append('image', this.image, bookForm['name'] + '.' + this.image.name.split('.')[this.image.name.split('.').length - 1]);
          bookFormTosend.append('book', JSON.stringify(bookForm));
          this._service.addBook(bookFormTosend).subscribe(
            res => {
              this._flashMessage.show('Book successfully added', {
                cssClass: 'alert-success', timeout: 2500
              });
              console.log(res)
            },
            err => { console.log(err) }
          )
        } else {
          this._flashMessage.show('Author must be from registerd authors, au can register new author from button below ', {
            cssClass: 'alert-danger', timeout: 5000
          })
        }
      } else {
        this._flashMessage.show('images only', {
          cssClass: 'alert-danger', timeout: 2500
        })
      }
    } else {
      this._flashMessage.show('Fill in all fields', {
        cssClass: 'alert-danger', timeout: 2500
      })
    }
  }
  openDialog(author) {
    this._modalService.open(author)
  }
  search = (text: Observable<string>) => {
    return text.pipe(debounceTime(200), switchMap(term => {
      return this._service.autorSearch({ term: term });
    }));
  };
  formatter = (x: { name: string }) => x.name;
  onFileSelected(e) {
    if (e.target.files) {
      if (this.checkImageType(e.target.files[0])) {
        this.imageValidation = true;
        this.image = e.target.files[0];
        this.renderUploadedImage(e)
      } else {
        this.imageValidation = false
      }
    }
  };
  checkType() {
    var x = typeof (this.bookAuthor) !== 'object' ? true : false;
    if (typeof (this.bookAuthor) === 'object' || this.bookAuthor === undefined) {
      this.authorTypeError = false;
      return false
    } else {
      this.authorTypeError = true;
      return true;
    }
  };
  checkImageType(file) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const type = fileTypes.test(file.name);
    if (type) {
      return true;
    } else {
      return false
    }

  };
  onAuthorFileSelected(e) {
    if (e.target.value) {
      if (this.checkImageType(e.target.files[0])) {
        this.authorImageValidation = true;
        this.authorImage = e.target.files[0];
        this.renderUploadedAuthorImage(e);
      }
    }
  }
  renderUploadedImage(e) {
    var self = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      self.imageUrl = dataURL;
    };
    reader.readAsDataURL(file);
  }
  renderUploadedAuthorImage(e) {
    var self = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      self.authorImageUrl = dataURL;
    };
    reader.readAsDataURL(file);
  }
};

