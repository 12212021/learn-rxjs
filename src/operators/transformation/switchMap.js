/*
* switchMap(project): Observable
* params(project): A function that, when applied to an item emitted by the source Observable, returns an Observable.
* Map to observable, complete previous inner observable, emit values.
* If you would like more than one inner subscription to be maintained, try mergeMap
* this operator is generally considered a safer default to mergeMap
* This operator can cancel in-flight network requests!
* */

import {interval, fromEvent, merge, empty, timer} from 'rxjs';
import {switchMap, scan, startWith, mapTo, takeWhile, tap} from 'rxjs/operators';


// 将一个信息转换为一个inner observable
// fromEvent(document, 'click').pipe(
//     switchMap(() => interval(1000))
// ).subscribe(console.log);


// switchMap将流转化为一个inner observable，条件不同会舍弃旧的流，转化为新的流
// rxjs6 不在支持resultSelector函数
const remainingElem = document.getElementById('remaining');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const COUNTDOWN_SECONDS = 100;

const interval$ = interval(1000).pipe(mapTo(-1));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
const resume$ = fromEvent(resumeButton, 'click').pipe(mapTo(true));

const timer$ = merge(pause$, resume$).pipe(
    startWith(true),
    switchMap(val => val ? interval$ : empty()),
    scan((acc, curr) => {
        if (curr === -1) {
            return acc + curr;
        }
        console.log(curr, 'empty stream');
        return curr;
    }, COUNTDOWN_SECONDS),
    takeWhile(val => val >= 0)
).subscribe(val => remainingElem.innerHTML = val + '');
