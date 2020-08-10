/*
* windowCount(windowSize: number, startWindowEvery: number): Observable
* 每几个value发出之后就切成一个window，每一个window就代表了一个新的inner observable
* */

import {interval} from 'rxjs';
import {windowCount, mergeAll, tap} from 'rxjs/operators';

const source$ = interval(1000);
const example$ = source$.pipe(
    windowCount(4),
    tap(_ => console.log('New window open'))
);

example$.pipe(
    mergeAll()
).subscribe(console.log);
