import { Component, ViewEncapsulation } from '@angular/core';
import { BookServiceService } from './services/book-service.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  closeResult: string;
  title = 'bookStore';
  constructor(
    private _service: BookServiceService,
    private _modalService: NgbModal

  ) { }
  openVerticallyCentered(content) {
    this._modalService.open(content, { centered: true })
  }
 }
