/*
* switchMapTo<T, I, R>(innerObservable: any, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, I | R>
* switchMap将所有的流信号都转化为一个固定的流，和mapTo与map用法类似
* */

import {interval, fromEvent} from 'rxjs';
import {
    switchMapTo,
    scan,
    startWith,
    takeWhile,
    finalize
} from 'rxjs/operators';

const COUNTDOWN_TIME = 100;
const click$ = fromEvent(document, 'click');
const countdown$ = interval(1000).pipe(
    scan((acc, _) => --acc, COUNTDOWN_TIME),
    startWith(COUNTDOWN_TIME)
);

const countdownElem = document.getElementById('countdown');


click$.pipe(
    switchMapTo(countdown$),
    takeWhile(val => val >= 0),
    finalize(() => console.log('count 10s down!'))
).subscribe(val => countdownElem.textContent = val + '');
