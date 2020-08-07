/*
* mergeScan(accumulator: (acc, value, index: number) => ObservableInput, seed, concurrent: number = Number.POSITIVE_INFINITY): OperatorFunction
* Accumulate value over time via merged observables.
* */

import {fromEvent, interval} from 'rxjs';
import {mergeScan, takeUntil, map, scan} from 'rxjs/operators';

const durationElem = document.getElementById('duration');

const mouseDown$ = fromEvent(document, 'mousedown');
const mouseUp$ = fromEvent(document, 'mouseup');

mouseDown$.pipe(
    mergeScan((acc, curr) => {
        console.log(acc, curr, 'index');
        return interval(1000).pipe(
            scan((a, _) => ++a, 0),
            // 这一步非常关键，下次鼠标按下的时候能接着上一次acc的value
            map(val => val + acc),
            takeUntil(mouseUp$)
        );
    }, 0)
).subscribe(val => durationElem.innerHTML = `${val}s`);
