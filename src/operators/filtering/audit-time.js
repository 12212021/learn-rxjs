/*
* auditTime(duration: number, scheduler?: Scheduler): Observable
* Ignore for given time then emit most recent value
* */

import {fromEvent} from 'rxjs';
import {auditTime} from 'rxjs/operators';


// Emit clicks at a rate of at most one click per second
fromEvent(document, 'click').pipe(
    auditTime(1000),
).subscribe(value => console.log(`${value}, Clicked!`));
