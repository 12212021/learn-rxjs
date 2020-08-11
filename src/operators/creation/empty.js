/*
* empty(scheduler: Scheduler): Observable
* Observable that immediately completes.
* */

import {empty, interval, fromEvent, merge} from 'rxjs';
import {switchMap, scan, takeWhile, startWith, mapTo} from 'rxjs/operators';

empty().subscribe(
    () => console.log('Next'),
    () => console.log('err'),
    () => console.log('complete')
);

const countdownSeconds = 10;
const setHTML = id => val => document.getElementById(id).innerHTML = val;
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const interval$ = interval(1000).pipe(
    mapTo(-1)
);

const pause$ = fromEvent(pauseButton, 'click').pipe(
    mapTo(false)
);
const resume$ = fromEvent(resumeButton, 'click').pipe(
    mapTo(true)
);

merge(pause$, resume$).pipe(
    startWith(true),
    switchMap(val => val ? interval$ : empty()),
    scan((acc, curr) => curr ? acc + curr : curr, countdownSeconds),
    takeWhile(v => v >= 0)
).subscribe(setHTML('remaining'));
