/*
* mapTo(value: any): Observable
* Map emissions to constant value
* */

import {interval, fromEvent} from 'rxjs';
import {mapTo} from 'rxjs/operators';

interval(1000).pipe(
    mapTo('Hello World!')
).subscribe(console.log);
// Hello World!  Hello World! ......

fromEvent(document, 'click').pipe(
    mapTo('GOODBYE')
).subscribe(console.log);
