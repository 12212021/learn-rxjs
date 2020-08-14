/*
* catchError(project : function): Observable
* Gracefully handle errors in an observable sequence.
* */

import {throwError, of, timer, from, fromEvent} from 'rxjs';
import {catchError, mergeMap, switchMap, concatMap, exhaustMap, tap} from 'rxjs/operators';

const source$ = throwError('this is an error cause by operator!');
const example$ = source$.pipe(
    catchError(val => of(`i catch error, details: ${val}`)),
);
example$.subscribe(console.log);


// example2 catching reject promise
const badPromise = () =>
    new Promise((resolve, reject) => {
        reject('Reject!');
    });
const source1$ = timer(1000);
const example1$ = source1$.pipe(
    mergeMap(_ => from(badPromise()).pipe(
        catchError(err => of(`bad promise: ${err}`))
    ))
);
example1$.subscribe(console.log);


// Example 3: Catching errors comparison when using switchMap/mergeMap/concatMap/exhaustMap
const fakeRequest$ = of().pipe(
    tap(_ => console.log('fake request!')),
    throwError
);

const iWillContinueListening$ = fromEvent(
    document.getElementById('continued'),
    'click'
).pipe(
    switchMap(_ => fakeRequest$.pipe(catchError(_ => of('keep on clicking!'))))
);

const iWillStopListening$ = fromEvent(
    document.getElementById('stop'),
    'click'
).pipe(
    switchMap(_ => fakeRequest$),
    catchError(_ => of('no more request!'))
);

iWillContinueListening$.subscribe(console.log);
iWillStopListening$.subscribe(console.log);
