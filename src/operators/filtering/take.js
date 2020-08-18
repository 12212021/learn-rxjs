/*
* take(count: number): Observable
* Emit provided number of values before completing.
* take操作符是skip操作符的counterpart
* */

import {fromEvent, of} from 'rxjs';
import {take, tap} from 'rxjs/operators';

of(1, 2, 3, 4, 5, 6).pipe(
    take(1)
).subscribe(console.log);


fromEvent(document, 'click').pipe(
    take(1),
    tap(v => console.log(`Your first click wan on location: ${v.screenX}:${v.screenY}`))
).subscribe();
