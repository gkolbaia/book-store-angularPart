import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookServiceService } from '../services/book-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _service: BookServiceService,
    private _router: Router
  ) {

  };

  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
