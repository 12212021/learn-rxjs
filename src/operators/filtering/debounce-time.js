/*
* debounceTime(dueTime: number, scheduler: Scheduler): Observable
* Discard emitted values that take less than the specified time between output
* */

import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

const searchBox = document.getElementById('search');

const keyup$ = fromEvent(searchBox, 'keyup').pipe(
    map(i => i.currentTarget.value),
    debounceTime(500)
).subscribe(console.log);
