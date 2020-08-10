/*
* repeat(count: number): Observable
* Repeats an observable on completion.
* like retry but for non error cases!
* */


import {repeat, delay} from 'rxjs/operators';
import {of} from 'rxjs';

const delayStream$ = of('delay value').pipe(
    delay(2000),
    repeat(3)
);

delayStream$.subscribe(console.log);
