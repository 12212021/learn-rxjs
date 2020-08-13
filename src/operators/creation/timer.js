/*
* timer(initialDelay: number | Date, period: number, scheduler: Scheduler): Observable
* After given duration, emit numbers in sequence every specified duration.
* 第一个参数是延迟多久emit第一个value，第二个参数是不停地emit value，他的period是多少
* */

import {timer} from 'rxjs';

// 1s后发出0
timer(1000).subscribe(console.log);

timer(1000, 2000).subscribe(console.log);
