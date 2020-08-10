/*
* delay(delay: number | Date, scheduler: Scheduler): Observable
* delay emitted values by given time.
* */

import {fromEvent, merge, of} from 'rxjs';
import {mergeMap, mapTo, delay, takeUntil} from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$.pipe(
    mergeMap(event => of(event).pipe(
        delay(700),
        takeUntil(mouseup$)
    ))
).subscribe(event => console.log('long press!', event));


const example$ = of(null);

const message$ = merge(
    example$.pipe(mapTo('hello')),
    example$.pipe(mapTo('world!'), delay(1000)),
    example$.pipe(mapTo('goodbye'), delay(2000)),
    example$.pipe(mapTo('world!'), delay(3000))
);

message$.subscribe(console.log);
