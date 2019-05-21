import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { Author } from 'src/app/models/author';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-autors',
  templateUrl: './edit-autors.component.html',
  styleUrls: ['./edit-autors.component.css']
})
export class EditAutorsComponent implements OnInit {
  authors: Author[];
  // minHeight: string = window.screen.height + 'px';
  bigAraay: any[] = [];
  author: Author;
  editedImageUrl: ArrayBuffer | string;
  editedImage: File = null;
  categories: object[];
  imageValidation: boolean = true;
  constructor(
    private _service: BookServiceService,
    private _flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this._service.getAuthors().subscribe(
      res => {
        this.authors = JSON.parse(JSON.stringify(res)).sort((a, b) => (a.name > b.name) ? 1 : -1);
        // this.authors.map(author => console.log(author.name));
        this.getCategories();
      });
  }
  getCategories() {
    this._service.getCategories().subscribe(
      res => {
        {
          var x = JSON.stringify(res);
          var y = JSON.parse(x);
          y.forEach(category => {
            category.existance = false;
          });
          this.categories = y;
        }
      }
    )
  }
  selectAuthor(author: Author) {
    this.editedImageUrl = null;
    this.editedImage = null;
    this.author = author;
    author.categories.forEach(neededCategory => {
      this.categories.forEach(category => {
        if (category['category'] === neededCategory['category']) {
          category['existance'] = true;
        }
      });
    });
  }
  onAuthorEditSubmit({ valid, value }) {
    if (valid) {
      this._service.getAuthor({ _id: this.author['_id'] }).subscribe(author => {
        var neededAuthor = JSON.parse(JSON.stringify(author))
        var authorEditForm: object = {};
        var categories = []
        if (neededAuthor.categories.length !== this.categories.length) {
          for (var category in value.categories) {
            if (value.categories[category]) {
              categories.push({ category: category });
            };
          };
        };
        if (!this.compareCategories(neededAuthor.categories, categories)) {
          authorEditForm['categories'] = categories
        };
        delete value.categories;
        delete this.author.categories;
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            if (key === 'dateOfBirth' || key === 'dateOfDeath') {
              if (new Date(value[key]).toDateString() !== new Date(neededAuthor[key]).toDateString()) {
                authorEditForm[key] = new Date(value[key]);
              }
            } else {
              if (value[key] !== neededAuthor[key]) {
                authorEditForm[key] = value[key];
              }
            }
          }
        }

        if (authorEditForm != {} || this.editedImage) {
          authorEditForm['_id'] = neededAuthor['_id'];
          this._service.editAuthor(authorEditForm).subscribe(res => {
            this._flashMessages.show('Author Changed', {
              cssClass: 'alert-success', timeout: 2500
            });
            this.uploadEditdImage()
            console.log(res);
            authorEditForm = {};
          });
        }
      });
    } else {
      this._flashMessages.show('incorrect form', {
        cssClass: 'alert-danger', timeout: 2500
      })
    }
  }
  compareCategories(a, b) {
    var result: boolean;
    if (a.length != b.length) {
      result = false
    } else {
      if (a.length === 1) {
        if (a[0].category === b[0].category) {
          result = true
        } else {
          result = false
        }
      } else {
        if (a.length != b.length) {
          result = false
        } else {
          var x = a.sort((a, b) => (a.category > b.category) ? 1 : -1);
          var y = b.sort((a, b) => (a.category > b.category) ? 1 : -1);
          x.forEach((element, index) => {
            if (x[index]['category'] !== y[index]['category']) {
              console.log(1);
              result = false
            } else if (index = x.length - 1) {
              result = true
            }
          });
        }
        return result;
      }
    }
    return result;
  }
  fileSelect(e) {
    if (e.target.files) {
      if (this.checkImageType(e.target.files[0])) {
        this.imageValidation = true;
        var file = e.target.files[0];
        this.editedImage = file;
        this.renderEditedImage(file);
      } else {
        this.imageValidation = false
      }
    }
  };
  renderEditedImage(file) {
    var self = this;
    var reader = new FileReader();
    reader.onload = () => {
      var dataUrl = reader.result;
      self.editedImageUrl = dataUrl
    }
    reader.readAsDataURL(file);
  }
  checkImageType(file) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const type = fileTypes.test(file.name);
    if (type) {
      return true;
    } else {
      return false
    }

  }
  uploadEditdImage() {
    if (this.editedImage) {
      var editedImageForm = new FormData();
      editedImageForm.append('image', this.editedImage, this.author['name'] + '.' + this.editedImage.name.split('.')[this.editedImage.name.split('.').length - 1]);
      this._service.editAuthorPoster(editedImageForm).subscribe(
        image => {
          console.log(image);
          this.author['imagePath'] = image['path'];
        }
      )
    }
  }
}

