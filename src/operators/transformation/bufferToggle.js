/*
* bufferToggle(openings: Observable, closingSelector: Function): Observable
* Toggle on to catch emitted values from source, toggle off to emit buffered values as array.
* */

import {fromEvent, interval} from 'rxjs';
import {bufferToggle} from 'rxjs/operators';

const sourceInterval$ = interval(1000);
const startInterval$ = interval(5000);
const closingInterval$ = val => {
    console.log(`Value: ${val} emitted, starting buffer! Closing in 3s`);
    return interval(3000);
};

sourceInterval$.pipe(
    bufferToggle(startInterval$, closingInterval$)
).subscribe(val => console.log(`Emitted value: ${val}`));


fromEvent(document, 'mousemove').pipe(
    bufferToggle(fromEvent(document,'mousedown'),
            _ => fromEvent(document, 'mouseup') )
).subscribe(console.log);
