/*
* takeLast(count: number): Observable
* Emit the last n emitted values before completion
* */

import {of} from 'rxjs';
import {takeLast} from 'rxjs/operators';

of('Ignore', 'Ignore', 'Hello', 'world').pipe(
    takeLast(2)
).subscribe(console.log);
