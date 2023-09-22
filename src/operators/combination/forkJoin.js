/*
 * forkJoin(...args, selector : function): Observable
 * When all observables complete, emit the last emitted value from each.
 * 
 * forkJoin类似于promise的all方法
 * */

import { delay, take } from 'rxjs/operators';
import { forkJoin, of, interval } from 'rxjs';

const myPromise = val =>
    new Promise(resolve =>
        setTimeout(() => resolve(`Promise Resolved: ${val}`, 5000))
    );

const example$ = forkJoin([
    of('Hello'),
    of('world'),
    interval(1000).pipe(take(1)),
    interval(1000).pipe(take(2)),
    myPromise('RESULT'),
]);

// ["Hello", "world", 0, 1, "Promise Resolved: RESULT"]
example$.subscribe(console.log);
