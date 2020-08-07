/*
* expand(project: function, concurrent: number, scheduler: Scheduler): Observable
* Recursively call provided function.
* */

import {interval, of} from 'rxjs';
import {expand, take} from 'rxjs/operators';

of(2).pipe(
    expand(val => {
        console.log(`passed val:${val}`);
        return of(1 + val);
    }),
    take(5)
).subscribe(console.log);
