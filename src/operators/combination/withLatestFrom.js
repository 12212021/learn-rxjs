/*
* withLatestFrom(other: Observable, project: Function): Observable
* provide the last value from another observable.
* */

import {withLatestFrom, map} from 'rxjs/operators';
import {interval} from 'rxjs';

const source$ = interval(5000);
const secondSource$ = interval(1000);
const example$ = source$.pipe(
    withLatestFrom(secondSource$),
    map(([first, second]) => {
        return `first(5s): ${first}  Second(1s):${second}`;
    })
);

example$.subscribe(console.log);
