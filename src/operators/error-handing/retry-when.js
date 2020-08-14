/*
* retryWhen(receives: (errors: Observable) => Observable, the: scheduler): Observable
* Retry an observable sequence on error based on custom criteria.
* 暂时还弄不明白，官方的实例跑不通
* */

import {timer, interval, of} from 'rxjs';
import {map, tap, retryWhen, delayWhen, catchError} from 'rxjs/operators';

const source1$ = interval(1000);
const example1$ = source1$.pipe(
    map(val => {
        if (val > 5) {
            throw val;
        }
        return val;
    }),
    retryWhen(errors => {
        errors.pipe(
            tap(val => console.log(`Value ${val} was to high`)),
            delayWhen(val => timer(val * 1000))
        );
    })
);
example1$.subscribe(console.log);
