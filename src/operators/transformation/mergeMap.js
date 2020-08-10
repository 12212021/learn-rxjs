/*
* mergeMap(project: function: Observable, resultSelector: function: any, concurrent: number): Observable
* Map to observable, emit values
* flatMap is an alias for mergeMap!
* If only one inner subscription should be active at a time, try switchMap!
* If the order of emission and subscription of inner observables is important, try concatMap!
*
* Maps each value to an Observable, then flattens all of these inner Observables using mergeAll.
* */

import {interval, of} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';

const myPromise = val =>
    new Promise(resolve =>
        resolve(`${val} World From Promise!`));


of('Hello').pipe(
    mergeMap(
        val => myPromise(val),
        (valFromOuter, valFromInner) => {
            return `Source: ${valFromOuter}, Promise: ${valFromInner}`;
        }
    )
).subscribe(console.log);
// output: "Source: Hello, Promise: Hello World From Promise!"


interval(1000).pipe(
    mergeMap(
        val => interval(5000).pipe(
            take(2)
        ),
        (outVal, inVal, outIndex, inIndex) => [outIndex, outVal, inIndex, inVal],
        2
    )
).subscribe(console.log);
/*
*  Output:
        [0, 0, 0, 0] <--1st inner observable
        [1, 1, 0, 0] <--2nd inner observable
        [0, 0, 1, 1] <--1st inner observable
        [1, 1, 1, 1] <--2nd inner observable
        [2, 2, 0, 0] <--3rd inner observable
        [3, 3, 0, 0] <--4th inner observable
* */
