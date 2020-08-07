/*
* exhaustMap(project: function, resultSelector: function): Observable
* Map to inner observable, ignore other values until that observable completes.
* */

import {interval, merge, of} from 'rxjs';
import {delay, take, exhaustMap, tap, mapTo} from 'rxjs/operators';

const sourceInterval$ = interval(1000);
const delayInterval$ = sourceInterval$.pipe(
    delay(10),
    take(10)
);

const exhaustSub$ = merge(
    delayInterval$,
    of(true)
).pipe(
    // tap(val => console.log(val)),
    exhaustMap(_ => sourceInterval$.pipe(
        mapTo('inner ob!'),
        take(3)
    ))
).subscribe(console.log);
