/*
* zip(observables: *): Observable
* After all observables emit, emit values as an array
* */

import {delay} from 'rxjs/operators';
import {of, zip} from 'rxjs';

const sourceOne$ = of('hello');
const sourceTwo$ = of('world');
const sourceThree$ = of('goodBye');
const sourceFour$ = of('world');
const example$ = zip(
    sourceOne$,
    sourceTwo$.pipe(delay(1000)),
    sourceThree$.pipe(delay(2000)),
    sourceFour$.pipe(delay(3000))
);

example$.subscribe(console.log);
/*
* 3s后输出一个数组，数组为 ["hello", "world", "goodBye", "world"]
* */
