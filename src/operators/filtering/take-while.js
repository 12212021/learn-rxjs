/*
* takeWhile(predicate: function(value, index): boolean, inclusive?: boolean): Observable
* Emit values until provided expression is false.
*
* */

import {of} from 'rxjs';
import {takeWhile, filter} from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
    takeWhile(val => val < 3)
).subscribe(console.log);


of(1, 2, 3, 9).pipe(
    // inclusive为true的时候，takeWhile的判断条件不起作用
    takeWhile(val => val <= 3, true)
).subscribe(console.log);


const source$ = of(3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3);
// allow values until value from source equals 3, then complete
source$.pipe(
    takeWhile(it => it === 3)
).subscribe(console.log);

// take all values equals to 3
source$.pipe(
    filter(it => it === 3)
).subscribe(console.log);
