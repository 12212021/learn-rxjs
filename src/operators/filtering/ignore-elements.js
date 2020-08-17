/*
* ignoreElements(): Observable
* Ignore everything but complete and error.
* */


import {interval, throwError, of} from 'rxjs';
import {take, ignoreElements, mergeMap} from 'rxjs/operators';


// 忽略所有的元素
interval(1000).pipe(
    take(5),
    ignoreElements()
).subscribe({
    next(val) {
        console.log(`Next val:${val}`);
    },
    error(err) {
        console.log(`Error: ${err}`);
    },
    complete() {
        console.log('complete!');
    }
});


const source$ = interval(100);
const error$ = source$.pipe(
    mergeMap(val => {
        if (val === 4) {
            return throwError(`Error At ${val}`);
        }
        return of(val);
    }),
    ignoreElements()
);

error$.subscribe(
    {
        next(val) {
            console.log(`Next val:${val}`);
        },
        error(err) {
            console.log(`Error: ${err}`);
        },
        complete() {
            console.log('complete!');
        }
    }
);
