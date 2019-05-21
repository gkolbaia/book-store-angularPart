import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { debounceTime, switchMap, tap, filter, map } from 'rxjs/operators';
import { of, pipe } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private _service: BookServiceService
  ) { }

  ngOnInit() {
    // this._service.getLoggedInUser().subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    // )
    console.log(this._service.getLoggedInUser().pipe(
      debounceTime(200),
      switchMap(sad => this._service.getLoggedInUser())
    ));
    console.log(this._service.getLoggedInUser());




    const nums = of(1, 2, 3, 4, 5);

    // Create a function that accepts an Observable.
    const squareOddVals = pipe(
      filter((n: number) => n % 2 !== 0),
      map(n => n * n)
    );

    // Create an Observable that will run the filter and map functions
    const squareOdd = squareOddVals(nums);

    // Subscribe to run the combined functions
    squareOdd.subscribe(x => console.log(x));

  }
}
