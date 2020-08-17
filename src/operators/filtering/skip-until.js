/*
* skipUntil(the: Observable): Observable
* Skip emitted values from source until provided observable emits.
* */

import {interval,timer} from 'rxjs';
import {skipUntil} from 'rxjs/operators';

// 6s后才取source observable的数
interval(1000).pipe(
    skipUntil(timer(6000))
).subscribe(console.log)
