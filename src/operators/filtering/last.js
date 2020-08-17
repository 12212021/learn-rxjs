/*
* last(predicate: function): Observable
* Emit the last value emitted from source on completion, based on provided expression.
* 如果prediction选中的是一系列的值，拉取最后一个
* */

import {from} from 'rxjs';
import {last} from 'rxjs/operators';

from([1, 2, 3, 4, 5]).pipe(
    last()
).subscribe(console.log);


from([1, 2, 3, 4, 5, 6]).pipe(
    last(val => val < 4)
).subscribe(console.log);


from([1, 2, 3, 4, 5, 6]).pipe(
    last(val => val > 9, 'no val is large than 9')
).subscribe(console.log);
