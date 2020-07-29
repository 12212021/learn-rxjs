/*
* mergeAll(concurrent: number): Observable
* Collect and subscribe to all observables
* */

import {map, mergeAll} from 'rxjs/operators';
import {of} from 'rxjs';

const myPromise = val => new Promise(
    resolve => setTimeout(
        () => resolve(`Result: ${val}`, 2000)
    )
);

const source$ = of(1, 2, 3, 4, 5);

const example$ = source$.pipe(
    map(val => myPromise(val)),
    mergeAll()
);

example$.subscribe(console.log);
