/*
* takeUntil(notifier: Observable): Observable
* Emit values until provided observable emits.
*
* */

import {interval, timer} from 'rxjs';
import {filter, scan, takeUntil, withLatestFrom, map} from 'rxjs/operators';


// take values until timer emits
interval(1000).pipe(
    takeUntil(timer(5000))
).subscribe(console.log);


// take the first 5 even numbers
const source$ = interval(1000);
const isEven = val => val % 2 === 0;
const evenSource$ = source$.pipe(filter(isEven));
const evenNumberCount$ = evenSource$.pipe(
    scan((acc, _) => acc + 1, 0)
);
const fiveEvenNumbers$ = evenSource$.pipe(filter(val => val > 5));

evenSource$.pipe(
    withLatestFrom(evenNumberCount$),
    map(([val, count]) => `Even Number (${count}): ${val}`),
    takeUntil(fiveEvenNumbers$)
).subscribe(console.log);
