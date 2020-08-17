/*
* skipWhile(predicate: Function): Observable
* Skip emitted values from source until provided expression is false.
* */

import {interval} from 'rxjs';
import {skipWhile} from 'rxjs/operators';

interval(1000).pipe(
    skipWhile(val => val < 5)
).subscribe(console.log);
