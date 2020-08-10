/*
* timeInterval(scheduler: *): Observable<TimeInterval<any>> | WebSocketSubject<T> | Observable<T>
* Convert an Observable that emits items into one that emits indications of the amount of time elapsed between those emissions
* 查看两个value emit之间隔了多少毫秒
* */

import {fromEvent} from 'rxjs';
import {timeInterval, tap} from 'rxjs/operators';

fromEvent(document, 'mousedown').pipe(
    timeInterval(),
    tap(console.log)
).subscribe(i => console.log(`milliseconds since last click: ${i.interval}`));
