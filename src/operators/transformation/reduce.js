/*
* reduce(accumulator: function, seed: any): Observable
* Reduces the values from source observable to a single value that's emitted when the source completes.
* */

import {of} from 'rxjs';
import {reduce} from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
    reduce((acc, val) => acc + val)
).subscribe(console.log);
