/*
* window(windowBoundaries: Observable): Observable
* Branch out the source Observable values as a nested Observable whenever windowBoundaries emits.
* 有两个observable，一个是outer observable，一个是window发出的observable，当window的observable emit一个信息后
* 对outer observable进行切割，切割成为一个个的window
* */

import {fromEvent, interval} from 'rxjs';
import {window, mergeAll, map, take} from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const sec = interval(1000);
const result = clicks.pipe(
    window(sec),
    map(win => win.pipe(take(2))), // each window has at most 2 emissions
    mergeAll(),              // flatten the Observable-of-Observables
);
result.subscribe(x => console.log(x));
