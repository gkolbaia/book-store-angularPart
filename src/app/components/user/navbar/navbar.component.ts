//Useris modeli maq shesaqmneli
import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BookServiceService } from 'src/app/services/book-service.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  passwordmatched: boolean = true;
  loginForm: {
    userName: '',
    password: ''
  };
  registrationForm: {
    userName: '',
    password: '',
    paswordMatch: '',
  };
  user: any = null;
  loggedInPersonStatus: string
  _emitService: any;


  constructor(
    private _modalService: NgbModal,
    private _service: BookServiceService,
    private _flashMessages: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this._service.getLoggedInUser().subscribe(
        user => {
          this.user = user
          this.loggedInPersonStatus = user['status'];
          console.log(this.loggedInPersonStatus)
        },
        err => {
          console.log(err)
        }
      )
    }
  }
  openDialog(content) {
    this.passwordmatched = true;
    // this._modalService.open(content, { centered: true });
    this._service.openDialog(content);
  }
  onLoginSubmit({ valid, value }) {
    if (valid) {
      this._service.userLogin(value).subscribe(
        user => {
          localStorage.setItem('token', user['token']);
          this._modalService.dismissAll();
          if (user['user']['status'] === 'admin') {
            this._router.navigate(['admin'])
            // console.log('admin');
          } else if (user['user']['status'] === 'user') {
            // console.log('user');
          }
          this.user = user;
          // this._service.testi().subscribe(
          //   res => console.log(res)
          // )
        },
        err => {
          this._flashMessages.show(err.error.message, {
            cssClass: 'alert-danger', timeout: 2500
          })
        }
      )
    } else {
      this._flashMessages.show('fill in all fields', {
        cssClass: 'alert-danger', timeout: 2500
      })
    }

  }
  onRegistrationSubmit({ valid, value }) {
    console.log(value)
    if (valid) {
      if (value.password === value.passwordMatch) {
        this._service.userRegistration(value).subscribe(
          user => {
            localStorage.setItem('token', user['token']);
            this._modalService.dismissAll();
          },
          err => {
            this._flashMessages.show(err.error.message, {
              cssClass: 'alert-danger', timeout: 2500
            })
          }
        )
      } else {
        this.passwordmatched = false
      }
    } else {
      this._flashMessages.show('Fill In all Fields', {
        cssClass: 'alert-danger', timeout: 2500
      })
    }
  }
  logOut() {
    localStorage.removeItem('token');
    this.user = null;
    this.loggedInPersonStatus = ''
  }
  turnModalWindowToSignUp(signUp) {
    this._modalService.dismissAll();
    this._modalService.open(signUp)
  }

}
