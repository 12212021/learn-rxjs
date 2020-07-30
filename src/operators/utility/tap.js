/*
* tap(nextOrObserver: function, error: function, complete: function): Observable
* Transparently perform actions or side-effects, such as logging.
* */

import {of} from 'rxjs';
import {tap, map} from 'rxjs/operators';


// logging
of(1, 2, 3, 4, 5, 6, 7).pipe(
    tap(val => console.log(`Before map: ${val}`)),
    map(val => val * 10),
    tap(val => console.log(`After map: ${val}`))
).subscribe(x => 0);


of(1, 2, 3, 4, 5, 6).pipe(
    map(val => val * 10),
    tap(val => console.log(`After map: ${val}`),
        err => console.log(err),
        complete => console.log(complete))
).subscribe(x => x);
