/*
* merge(input: Observable): Observable
* Turn multiple observables into a single observable.
* */

import {interval, merge} from 'rxjs';
import {map, take} from 'rxjs/operators';

const first$ = interval(2500).pipe(
    map(val => `first: ${val}`)
);
const second$ = interval(1000).pipe(
    map(val => `second: ${val}`)
);

const example$ = merge(first$, second$).pipe(take(10));

example$.subscribe(console.log);
