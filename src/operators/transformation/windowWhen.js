/*
* windowWhen(closingSelector: function(): Observable): Observable
* Close window at provided time frame emitting observable of collected values from source.
* */

import {interval, timer} from 'rxjs';
import {windowWhen, tap, mergeAll} from 'rxjs/operators';

timer(0, 1000).pipe(
    windowWhen(() => interval(5000)),
    tap(_ => console.log('new window')),
    mergeAll()
).subscribe(console.log);
