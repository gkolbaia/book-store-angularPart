import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { switchMap, map, tap } from 'rxjs/operators';
import { pipe, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  constructor(
    private _http: HttpClient,
    private _ngbService: NgbModal
  ) { };

  addBook(book) {
    return this._http.post('api/admin/addbook', book);
  };
  openDialog(content) {
    this._ngbService.open(content);
  };
  userLogin(user) {
    return this._http.post('api/authentication/login', user)
  };
  userRegistration(user) {
    return this._http.post('api/authentication/registration', user)
  };
  getToken() {
    return localStorage.getItem('token')
  };
  testi() {
    return this._http.get('api/authentication/sada')
  };
  getLoggedInUser() {
    return this._http.get('api/authentication/getLoggedInUser');
  };
  getCategories() {
    return this._http.get('api/admin/getBookCategories');
  };
  addAuthor(author) {
    return this._http.post('api/admin/addauthor', author)
  };
  getAuthors() {
    return this._http.get('api/admin/getauthors');
  };
  autorSearch(term) {
    return this._http.post('api/admin/autorSearch', term)
  }
  mainSearch(term) {
    return this._http.post('api/user/mainsearch', term)
  };
  getCurrentAuthor(authorName) {
    return this._http.post('api/user/getcurrentauthor', authorName)
  };
  getBookByName(bookName) {
    return this._http.post('api/user/getbookbyname', bookName)
  };
  saveAuthorPoster(poster) {
    return this._http.post('api/admin/saveauthorposter', poster)
  };
  //surati
  getBookPoster() {
    return this._http.get('api/user/getbookposter');
  };
  getBooks() {
    return this._http.get('api/user/getbooks')
  }
  capitalizeLetters(string) {
    var newString = '';
    var x = string.split(' ');
    if (x.length > 1) {
      x.forEach(element => {
        newString += (element.charAt(0).toUpperCase() + element.slice(1, (element.length)) + ' ');
      });
      return newString
    } else {
      return string.charAt(0).toUpperCase() + string.slice(1, (string.length));
    }
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1, (string.length));
  };
  getBooksByCategory(category) {
    return this._http.post('api/user/getbooksbycategory', category)
  };
  getBooksByAuthor(author) {
    return this._http.post('api/user/getbooksbyauthor', author);
  };
  getAuthor(id) {
    return this._http.post('api/admin/getauthor', id);
  };
  editAuthor(editedAuthor) {
    return this._http.post('api/admin/editauthor', editedAuthor)
  };
  editAuthorPoster(image) {
    return this._http.post('api/admin/editauthorposter', image);
  }
}
