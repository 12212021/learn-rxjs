/*
* windowTime(windowTimeSpan: number, windowCreationInterval: number, scheduler: Scheduler): Observable
* 以时间为window boundary，生成inner observable
* */

import {timer} from 'rxjs';
import {windowTime, tap, mergeAll} from 'rxjs/operators';

timer(0, 1000).pipe(
    windowTime(3000),
    tap(_ => console.log('new window')),
    mergeAll()
).subscribe(console.log);
