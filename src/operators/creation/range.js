/*
* range(start: number, count: number, scheduler: Scheduler): Observable
* Emit numbers in provided range in sequence.
* 是同步发出的
* */

import {range} from 'rxjs';

range(1, 10).subscribe(console.log);
console.log('end');
