/*
* every(predicate: function, thisArg: any): Observable
* If all values pass predicate before completion emit true, else false.
* */

import {every, delay, tap} from 'rxjs/operators';
import {of, concat} from 'rxjs';

// of(1, 2, 3, 4, 5,).pipe(
//     every(val => val % 2 === 0)
// ).subscribe(predication => console.log(predication));
// // false
//
// of(2, 4, 6, 8, 10).pipe(
//     every(val => val % 2 === 0)
// ).subscribe(console.log);
// // true

// http模拟请求
const returnCode = request => Number.isInteger(request) ? 200 : 400;
const fakeRequest = req =>
    of({code: returnCode(req)}).pipe(
        tap(_ => console.log(`request: ${req}`)),
        delay(1000)
    );

concat(
    fakeRequest(1),
    fakeRequest('Invalid payload!'),
    fakeRequest(2)
).pipe(
    every(code => code === 200),
    tap(e => console.log(`all request successful: ${e}`))
).subscribe(console.log);
