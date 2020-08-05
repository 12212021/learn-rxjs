/*
* concatMap(project: function, resultSelector: function): Observable
* Map values to inner observable, subscribe and emit in order.
* concatMap只有上一个observable完成之后才会订阅下一个observable
* mergeMap一股脑地订阅了所有的inner observable，inner observable自由emit
* */

import {of} from 'rxjs';
import {concatMap, delay, mergeMap} from 'rxjs/operators';

const concatMapExample$ = of(2000, 1000).pipe(
    concatMap(val => of(`Delay by: ${val}ms`).pipe(
        delay(val)
    ))
);

const mergeMapExample$ = of(2000, 1000).pipe(
    mergeMap(val => of(`Delay by: ${val}ms`).pipe(
        delay(val)
    ))
);

// concatMapExample$.subscribe(console.log);
mergeMapExample$.subscribe(console.log);

