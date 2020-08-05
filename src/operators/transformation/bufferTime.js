/*
* bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, scheduler: Scheduler): Observable
* Collect emitted values until provided time has passed, emit as array.
* */

import {interval} from 'rxjs';
import {bufferTime} from 'rxjs/operators';

interval(500).pipe(
    bufferTime(2000),
).subscribe(console.log);


interval(500).pipe(
    // 第二个参数代表了何时启动下一个buffer
    bufferTime(2000, 1000)
).subscribe(console.log);
