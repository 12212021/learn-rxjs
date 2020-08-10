/*
* windowToggle(openings: Observable, closingSelector: function(value): Observable): Observable
* Collect and emit observable of values from source between opening and closing emission.
* */


import {timer, interval} from 'rxjs';
import {tap, windowToggle, mergeAll} from 'rxjs/operators';

timer(0, 1000).pipe(
    tap(val => console.log(`timer: ${val}`)),
    windowToggle(interval(5000), val => interval(val * 1000)),
    tap(_ => console.log('new window')),
    mergeAll()
).subscribe(console.log);
